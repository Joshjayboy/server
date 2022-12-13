import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },

    gender: {
      type: String,
      require: true,
    },
    faculty: {
      type: String,
      require: true,
    },
    department: {
      type: String,
      require: true,
    },
    homeaddress: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    hosteladdress: {
      type: String,
      require: true,
    },
    hostellocation: {
      type: String,
      require: true,
    },
    unitofwork: {
      type: String,
      require: true,
    },
    koinonia: {
      type: String,
      require: true,
    },
    dobirth: {
      type: String,
      require: true,
    },
    level: {
      type: String,
      require: true,
    },
    selectedFile: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// Login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
