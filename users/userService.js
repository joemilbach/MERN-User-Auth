﻿const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("utility/db");
const User = db.User;

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ email, password }) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, config.secret, {
      expiresIn: "7d",
    });
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function create(userParam) {
  // Validate
  if (await User.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }

  if (userParam.password.length < 5) {
    throw "Minimum of 5 character in password";
  }
  if (userParam.password !== userParam.passwordConfirm) {
    throw "Password fields do not match";
  }

  const user = new User(userParam);

  // Default username to email minus domain
  if (!userParam.username) {
    user.username = userParam.email.substring(
      0,
      userParam.email.lastIndexOf("@")
    );
  }

  // Set super admin and default roles
  if (userParam.email === config.saEmail) {
    user.role = "SA";
  } else if (!userParam.role) {
    user.role = "U";
  }

  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }

  await user.save();
}

async function update(id, updateParam) {
  const user = await User.findById(id);
  const token = updateParam.token;
  const sa = updateParam.sa;
  let userUpdates = {};

  // Validate
  if (!user) throw "User not found";

  if (updateParam.email) {
    const existingUser = await User.findOne({ email: updateParam.email });
    if (existingUser && id !== existingUser) {
      throw 'Email "' + updateParam.email + '" is already taken';
    }
    userUpdates.email = updateParam.email;
  }

  if (updateParam.password) {
    if (updateParam.password.length < 5) {
      throw "Minimum of 5 character in password";
    }
    if (updateParam.password !== updateParam.passwordConfirm) {
      throw "Password fields do not match";
    }
    const passwordMatch = await bcrypt.compare(updateParam.password, user.hash);
    if (passwordMatch) {
      throw "Password currently being used";
    }
    userUpdates.hash = bcrypt.hashSync(updateParam.password, 10);
  }

  if (updateParam.username) {
    userUpdates.username = updateParam.username;
  }

  if (updateParam.role) {
    userUpdates.role = updateParam.role;
  }

  // Copy userUpdates properties to user
  Object.assign(user, userUpdates);
  await user.save();

  if (sa) {
    return {
      ...user.toJSON(),
      sa,
    };
  } else {
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}
