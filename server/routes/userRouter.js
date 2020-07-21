const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, displayName } = req.body;

    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Missing required fields." });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Minimum of 5 character in password" });
    }
    if (password !== passwordCheck) {
      return res.status(400).json({ msg: "Password fields do not match" });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    if (!displayName) {
      displayName = email.substring(0, email.lastIndexOf("@"));
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Enter email & password" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Account not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ msg: "Email and/or password incorrect" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { id, email, password, passwordCheck, displayName } = req.body;
    const user = await User.findOne({ _id: id });
    let userUpdates = {};

    if (email) {
      const existingUser = await User.findOne({ email: email });
      if (existingUser && id !== existingUser) {
        return res.status(400).json({ msg: "Email already used" });
      }
      userUpdates.email = email;
    }

    if (password) {
      if (password.length < 5) {
        return res
          .status(400)
          .json({ msg: "Minimum of 5 character in password" });
      }
      if (password !== passwordCheck) {
        return res.status(400).json({ msg: "Password fields do not match" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return res.status(400).json({ msg: "Password currently being used" });
      }
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      userUpdates.password = passwordHash;
    }

    if (displayName) {
      if (displayName === "none") {
        userUpdates.displayName = user.email.substring(
          0,
          user.email.lastIndexOf("@")
        );
      } else {
        userUpdates.displayName = displayName;
      }
    }

    const userEdited = await User.findByIdAndUpdate(
      id,
      { $set: userUpdates },
      { new: true }
    );

    res.json(userEdited);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/validToken", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    email: user.email,
    displayName: user.displayName,
    autoLogin: user.autoLogin,
  });
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    displayName: user.displayName,
  });
});

module.exports = router;
