var express = require('express');
var router = express.Router();

const userModel = require('@model/user/user.model');
const { requiresAuth } = require('@middlewares/authMiddleware');

// POST /user/ Create
router.post('/', requiresAuth, function (req, res, next) {
  return (async () => {
    if (req.session.user.role != "admin") return res.status(403).send('Unauthorized for this task');
    const userToCreate = req.body;
    const user = await userModel.createUser(userToCreate);
    if (user.error) return res.status(500).send(user.error.message);
    return res.status(201).send(user);
  })();
});

// GET /user/?username=id Get User by username
router.get('/', requiresAuth, function(req, res, next) {
  return (async () => {
    if (req.session.user.role != "admin") return res.status(403).send('Unauthorized for this task');
    const { username } = req.query;
    const user = await userModel.getUser(username);
    if (!user) return res.status(404).send('User not found');
    if (user.error) return res.status(500).send(error);
    const userResponse = {
      username: user.username
    };
    return res.status(200).send(userResponse);
  })();
});

// GET /user/all Get the user list
router.get('/all', requiresAuth, function(req, res, next) {
  return (async () => {
    if (req.session.user.role != "admin") return res.status(403).send('Unauthorized for this task');
    const users = await userModel.getUsers();
    if (!users) return res.status(404).send('User not found');
    if (users.error) return res.status(500).send(users.error);
    const userResponse = users;
    return res.status(200).send(userResponse);
  })();
});

// PUT /user/ Update User by username
router.put('/', requiresAuth, function(req, res, next) {
  return (async () => {
    if (req.session.user.role != "admin") return res.status(403).send('Unauthorized for this task');
    const userToUpdate = req.body;
    const { username } = req.query;
    const user = await userModel.updateUser(username, userToUpdate);
    if (!user) return res.status(404).send('User not found');
    if (user.error) return res.status(500).send(error);
    const userResponse = {
      username: user.username
    };
    return res.status(200).send(userResponse);
  })();
});

// DELETE /user/ Get User by username
router.delete('/', requiresAuth, function(req, res, next) {
  return (async () => {
    if (req.session.user.role != "admin") return res.status(403).send('Unauthorized for this task');
    const { username } = req.query;
    const user = await userModel.deleteUser(username);
    if (!user) return res.status(404).send('User not found');
    if (user.error) return res.status(500).send(user.error);
    return res.status(200).send('User deleted');
  })();
});

// POST /user/login Validate user data and create session
router.post('/login', function(req, res, next) {
  return (async () => {
    const {username, password} = req.body;
    const userId = await userModel.auth({username, password});
    if (!userId || userId.error) return res.status(500).send("Failed Auth");
    req.session.user = {
      userId: userId.id.toString(),
      role: userId.role
    }
    return res.status(200).send('Welcome!');
  })();
});

// GET /user/logout Destroy session
router.get('/logout', function(req, res, next) {
  return (async () => {
    if (req.session) {
      // delete session object
      const session = await req.session.destroy();
      if(req.session) {
        return res.status(500).send("Failed LogOut");
      } else {
        return res.send('Goodbye!');
      }
    }
  })();
});

module.exports = router;