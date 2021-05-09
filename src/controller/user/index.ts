/* tslint:disable:no-shadowed-variable */

import express from "express";
const router = express.Router();

import * as userModel from "../../model/user/user.model";
import { requiresAuth } from "../../middlewares/authMiddleware";

// POST /user/ Create
router.post("/", function (req: any, res, next) {
  return (async () => {
    const userToCreate = req.body;
    const user = await userModel.createUser(userToCreate);
    if (user.error) return res.status(409).send(user.error.message);
    req.session.user = await authToSession(
      req.session,
      user.id.toString(),
      user.role
    );
    return res.status(201).send({ username: user.username, role: user.role });
  })();
});

// GET /user/?username=id Get User by username
router.get("/", requiresAuth, function (req: any, res, next) {
  return (async () => {
    if (req.session.user.role !== "admin")
      return res.status(403).send("Unauthorized for this task");
    const { username } = req.query;
    const user = await userModel.getUser(username);
    if (!user) return res.status(404).send("User not found");
    if (user.error) return res.status(500).send(user.error);
    const userResponse = {
      username: user.username,
    };
    return res.status(200).send(userResponse);
  })();
});

// GET /user/all Get the user list
router.get("/all", requiresAuth, function (req: any, res, next) {
  return (async () => {
    if (req.session.user.role !== "admin")
      return res.status(403).send("Unauthorized for this task");
    const users = await userModel.getUsers();
    if (!users) return res.status(404).send("User not found");
    if (users.error) return res.status(500).send(users.error);
    const userResponse = users;
    return res.status(200).send(userResponse);
  })();
});

// PUT /user/ Update User by username
router.put("/", requiresAuth, function (req: any, res, next) {
  return (async () => {
    if (req.session.user.role !== "admin")
      return res.status(403).send("Unauthorized for this task");
    const userToUpdate = req.body;
    const { username } = req.query;
    const user = await userModel.updateUser(username, userToUpdate);
    if (!user) return res.status(404).send("User not found");
    if (user.error) return res.status(500).send(user.error);
    const userResponse = {
      username: user.username,
    };
    return res.status(200).send(userResponse);
  })();
});

// DELETE /user/ Get User by username
router.delete("/", requiresAuth, function (req: any, res, next) {
  return (async () => {
    if (req.session.user.role !== "admin")
      return res.status(403).send("Unauthorized for this task");
    const { username } = req.query;
    const user = await userModel.deleteUser(username);
    if (!user) return res.status(404).send("User not found");
    if (user.error) return res.status(500).send(user.error);
    return res.status(200).send("User deleted");
  })();
});

// POST /user/login Validate user data and create session
router.post("/login", function (req: any, res, next) {
  return (async () => {
    const { username, password } = req.body;
    const userId = await userModel.auth({ username, password });
    if (!userId || userId.error) return res.status(401).send("Failed Auth");
    req.session.user = await authToSession(
      req.session,
      userId.id.toString(),
      userId.role
    );
    return res.status(200).send({ username, role: userId.role });
  })();
});

// GET /user/logout Destroy session
router.get("/logout", function (req: any, res, next) {
  return (async () => {
    if (req.session) {
      // delete session object
      req.session.destroy();
      if (req.session) {
        return res.status(500).send("Failed LogOut");
      } else {
        return res.status(200).send({ message: "Bye!" });
      }
    }
  })();
});

function authToSession(session, user, role) {
  return (async () => {
    return (session.user = {
      userId: user,
      role,
    });
  })();
}

export const user = router;
