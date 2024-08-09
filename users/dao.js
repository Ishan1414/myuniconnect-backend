import mongoose, { model, Mongoose } from "mongoose";
import userModel from "./model.js";

export const findUserByEmail = (email) => userModel.findOne({ email });

export const createUser = (user) => {
    user._id = new mongoose.Types.ObjectId()
    return userModel.create(user)
};

export const updateUser = (id, user) =>
    userModel.updateOne({ _id: id }, { $set: user });

export const deleteUser = (id) => userModel.deleteOne({ _id: id });

export const findUserById = (id) => userModel.findById(id);

export const findAllUsers = () => userModel.find();