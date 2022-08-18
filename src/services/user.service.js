import { User } from "../models/User.js";
import { CustomError } from "../services/error.service.js";

export const getUserBalance = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new CustomError(404, "User not found.");
  return user.balance;
};
