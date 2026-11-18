import { Schema, model, models } from "mongoose";
import { ROLES } from "@/lib/types";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ROLES,
      default: "client",
      index: true,
    },
    storeName: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 400,
    },
  },
  { timestamps: true },
);

export const UserModel = models.User || model("User", userSchema);
