const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/users");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.json({
        status: "error",
        message: "Hold up! You're already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json({ status: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existed_user = await user.findOne({ email });

    if (!existed_user) {
      return res.json({
        status: "error",
        message: "Oops! Email is not registered.",
      });
    } else {
      const checkPassword = await bcrypt.compare(
        password,
        existed_user.password
      );

      if (!checkPassword) {
        return res.json({ status: "error", message: "Password is incorrect." });
      } else {
        const token = jwt.sign(
          { _id: existed_user._id, user: existed_user },
          "secret123",
          { expiresIn: "5h" }
        );

        return res.json({
          status: "success",
          user: {
            adminId: existed_user._id,
            name: existed_user.name,
            email: existed_user.email,
          },
          token,
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;
