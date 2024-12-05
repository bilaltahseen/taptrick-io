import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  image: { type: String, default: "" },
  emailVerified: { type: Date, default: null },
  isVerified: { type: Boolean, default: false },
  isSubscribed: { type: Boolean, default: false },
  stripeCustomerId: { type: String, default: "" },
  stripeSubscriptionId: { type: String, default: "" },
  passwordResetToken: { type: String, default: "" },
  passwordResetAt: { type: Date, default: null },
});

export const User = models?.User || model('User', UserSchema);