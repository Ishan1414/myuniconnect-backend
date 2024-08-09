import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    city: String,
    about: String,
    university: String,
    dob: Date,
    following: [],
    follower: []
  },
  {
    collection: "users",
  }
);

export default userSchema;