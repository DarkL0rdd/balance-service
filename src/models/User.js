import mongoose from "mongoose";
const { Schema } = mongoose;

export const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
