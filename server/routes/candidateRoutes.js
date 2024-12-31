const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
const Candidate = require("../models/candidate");
const Test = require("../models/test");

// router.post("/register-candidate/:testId", async (req, res) => {
//   const testId = req.params.testId;
//   const { email, name } = req.body;
//   console.log(testId,email,name);

//   if (!email || !name) {
//     return res.status(400).json({ message: "Email and name are required." });
//   }

//   try {
//     let candidate = await Candidate.findOne({ email, name });

//     // if (candidate) {
//     //   const token = jwt.sign({ user: candidate }, "secret123", {
//     //     expiresIn: "1h",
//     //   });

//     // }

//     candidate = new Candidate({
//       name,
//       email,
//       registeredTests: [{ testId: testId }],
//     });

//     await candidate.save();

//     const token = jwt.sign({ user: candidate }, "secret123", {
//       expiresIn: "1h",
//     });

//     res.status(201).json({
//       message: "User registered successfully.",
//       candidate,
//       token,
//     });

//   } catch (error) {
//     console.error("Error registering user:", error);
//     res.status(500).json({ message: "Error registering user." });
//   }
// });

// router.post("/register-test", authenticate, async (req, res) => {
//   const { testId } = req.body;
//   const candidateId = req.userId;

//   try {
//     const test = await Test.findById(testId);
//     if (!test) {
//       return res.status(404).json({ message: "Test not found." });
//     }

//     let candidate = await Candidate.findById(candidateId);
//     // if (!candidate) {
//     //     candidate = await Candidate({
//     //         name: req.userName,
//     //         email: req.userEmail,
//     //         registeredTests: [],
//     //     });
//     // }

//     const alreadyRegistered = candidate.registeredTests.some((registered) => {
//       return registered.testId.equals(testId);
//     });

//     if (alreadyRegistered) {
//       return res
//         .status(400)
//         .json({ message: "User is already registered for this test." });
//     }
//     candidate.registeredTests.push({ testId });
//     await candidate.save();

//     res.status(200).json({
//       message: "Successfully registered for the test.",
//       // redirectUrl: /test/${testId},
//       testId,
//     });
//   } catch (error) {
//     console.error("Error registering for test ba:", error);
//     res.status(500).json({ message: "Error registering for the test bb." });
//   }
// });

router.post("/register-candidate", async (req, res) => {
  const { email, name } = req.body;
  const { testId } = req.body.testId;
  const candidateId = req.userId;

  if (!email || !name) {
    return res.status(400).json({ message: "Email and name are required." });
  }
  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found." });
    }

    let candidate = await Candidate.findOne({ email, name });
    if (!candidate) {
      candidate = new Candidate({
        name,
        email,
        registeredTests: [],
      });

      await candidate.save();
    }

    const alreadyRegistered = candidate.registeredTests.some((registered) => {
      return registered.testId.equals(testId);
    });

    if (alreadyRegistered) {
      return res
        .status(400)
        .json({ message: "User is already registered for this test." });
    }
    candidate.registeredTests.push({ testId });
    await candidate.save();

    res.status(200).json({
      message: "Successfully registered for the test.",
    });
  } catch (error) {
    console.error("Error registering for test:", error);
    res.status(500).json({ message: "Something went wrong, plese try again later." });
  }
});

router.post("/candidate-login", async (req, res) => {
  const { email, name } = req.body;
  const testId = req.body.testId;

  if (!email || !name) {
    return res.status(400).json({ message: "Email and name are required." });
  }
  try {
    const test = await Test.findById(testId);

    if (!test) {
      return res
        .status(404)
        .json({ status: "error", message: "Test not found." });
    }

    let candidate = await Candidate.findOne({ email, name });
    if (!candidate) {
      return res
        .status(404)
        .json({ status: "error", message: "Candidate not found." });
    }

    const alreadyRegistered = candidate.registeredTests.some((registered) => {
      return registered.testId.equals(testId);
    });

    if (alreadyRegistered) {
      const token = jwt.sign({ user: candidate }, "secret123", {
        expiresIn: "1h",
      });

      res.status(200).json({
        status: "success",
        message: "Successfully logged in for the test.",
        token,
        candidate,
      });
    }
  } catch (error) {
    console.error("Error logging in for test:", error);
    res.status(500).json({ message: "Something went wrong, plese try again later." });
  }
});

module.exports = router;
