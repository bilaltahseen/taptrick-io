import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: "" },
  emailVerified: { type: Date, default: null },
  isSubscribed: { type: Boolean, default: false },
  stripeCustomerId: { type: String, default: "" },
});

export const User = models?.User || model('User', UserSchema);