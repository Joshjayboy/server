import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";

const userRoute = express.Router();

// // storage
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "./client/public/uploads/");
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// LOGIN
userRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// REGISTER
userRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// post profile
userRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const {
      name,
      email,
      gender,
      faculty,
      department,
      homeaddress,
      state,
      hosteladdress,
      hostellocation,
      unitofwork,
      koinonia,
      dobirth,
      level,
      selectedFile,
      password,
    } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      gender,
      faculty,
      department,
      homeaddress,
      state,
      hosteladdress,
      hostellocation,
      unitofwork,
      koinonia,
      dobirth,
      level,
      selectedFile,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        faculty: user.faculty,
        department: user.department,
        homeaddress: user.homeaddress,
        state: user.state,
        hosteladdress: user.hosteladdress,
        hostellocation: user.hostellocation,
        unitofwork: user.unitofwork,
        koinonia: user.koinonia,
        dobirth: user.dobirth,
        level: user.level,
        selectedFile: user.selectedFile,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// Profile
userRoute.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        faculty: user.faculty,
        department: user.department,
        homeaddress: user.homeaddress,
        state: user.state,
        hosteladdress: user.hosteladdress,
        hostellocation: user.hostellocation,
        unitofwork: user.unitofwork,
        koinonia: user.koinonia,
        dobirth: user.dobirth,
        level: user.level,
        selectedFile: user.selectedFile,
        isAdmin: user.isAdmin,

        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRoute.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.gender = req.body.gender || user.gender;
      user.faculty = req.body.faculty || user.faculty;
      user.department = req.body.department || user.department;
      user.homeaddress = req.body.homeaddress || user.homeaddress;
      user.state = req.body.state || user.state;
      user.hosteladdress = req.body.hosteladdress || user.hosteladdress;
      user.hostellocation = req.body.hostellocation || user.hostellocation;
      user.unitofwork = req.body.unitofwork || user.unitofwork;
      user.koinonia = req.body.koinonia || user.koinonia;
      user.dobirth = req.body.dobirth || user.dobirth;
      user.level = req.body.level || user.level;
      user.selectedFile = req.body.selectedFile || user.selectedFile;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        gender: updatedUser.gender,
        faculty: updatedUser.faculty,
        department: updatedUser.department,
        homeaddress: updatedUser.homeaddress,
        state: updatedUser.state,
        hosteladdress: updatedUser.hosteladdress,
        hostellocation: updatedUser.hostellocation,
        unitofwork: updatedUser.unitofwork,
        koinonia: updatedUser.koinonia,
        dobirth: updatedUser.dobirth,
        level: updatedUser.level,
        selectedFile: updatedUser.selectedFile,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN
userRoute.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);
export default userRoute;
