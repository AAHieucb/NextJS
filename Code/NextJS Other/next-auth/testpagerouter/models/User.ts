import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  accessToken?: string; // Add access token field
  refreshToken?: string; // Add refresh token field
}

const userSchema: Schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String },
  accessToken: { type: String }, // Store access token
  refreshToken: { type: String }, // Store refresh token
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;