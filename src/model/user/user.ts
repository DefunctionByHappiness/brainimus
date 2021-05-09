import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import * as userModel from "./user.model";

function createUser(user) {
  return async () => {
    return await userModel.createUser(user);
  };
}

function getUser(username) {
  return userModel.getUser(username);
}

export { createUser, getUser };
