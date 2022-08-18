import mongoose from "mongoose";
const { Schema } = mongoose;
import { arrayType, arrayStatus } from "../services/arrays.js";

export const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    type: {
      type: String,
      required: [true, "Transaction type is required."],
      enum: { values: arrayType, message: "Wrong transaction type." },
    },
    amount: {
      type: Number,
      required: [true, "Transaction amount is required."],
      min: [0, "Amount can't be less then 0"],
    },
    status: {
      type: String,
      required: [true, "Transaction status is required."],
      enum: { values: arrayStatus, message: "Wrong transaction status." },
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
