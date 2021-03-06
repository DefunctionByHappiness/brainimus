import { mongoose } from "../mongo";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    unique: true,
  },
  password: String,
  role: String,
});

userSchema.pre("save", function (next) {
  const user = userSchema;

  if (!user.role) user.role = "user";
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// authenticate input against database
// userSchema.statics.authenticate = function (username, password, callback) {};

const User = new mongoose.model("User", userSchema);

function getUsers() {
  return (async () => {
    try {
      return await User.find({}, { _id: 0, password: 0, __v: 0 });
    } catch (err) {
      console.error("Mongo error", err);
      return { error: "userNotFound" };
    }
  })();
}

function getUser(username) {
  return (async () => {
    try {
      const foundUser = await User.findOne({ username });
      return foundUser;
    } catch (err) {
      console.error("Mongo error", err);
      return { error: "userNotFound" };
    }
  })();
}

function createUser(user) {
  return (async () => {
    try {
      const createdUser = await User.create(user);
      return {
        username: createdUser.username,
        id: createdUser.id,
        role: createdUser.role,
      };
    } catch (err) {
      console.error("Mongo error", err);
      return { error: err };
    }
  })();
}

function updateUser(username, user) {
  return (async () => {
    try {
      return await User.findOneAndUpdate({ username }, user, {
        new: true,
      });
    } catch (err) {
      console.error("Mongo error", err);
      return { error: err };
    }
  })();
}

function deleteUser(userName) {
  return (async () => {
    try {
      return await User.findOneAndDelete({ username: userName });
    } catch (err) {
      console.error("Mongo error", err);
      return { error: err };
    }
  })();
}

function auth(user) {
  return (async () => {
    const foundUser = await User.findOne({ username: user.username });
    if (!foundUser) {
      const err = new Error("User not found.");
      return { error: err, status: 401 };
    }
    const comparedUser = await bcrypt.compare(
      user.password,
      foundUser.password
    );
    if (comparedUser) {
      return { id: foundUser._id, role: foundUser.role };
    } else {
      return undefined;
    }
  })();
}

export { getUsers, createUser, getUser, updateUser, deleteUser, auth };
