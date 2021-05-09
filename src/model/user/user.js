var mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userModel = require('./user.model');

function createUser(user){
  return  async () => {
    return await userModel.createUser(user);
  }
}

function getUser(username) {
  return userModel.getUser(username);
}

exports.createUser = createUser;
exports.getUser = getUser;