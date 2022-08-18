import { User } from "../models/User.js";
import { getUserBalance } from "../services/user.service.js";

export const createUser = async (req, res) => {
  await User.create({ firstName: "Test 1", balance: 0 });
  await User.create({ firstName: "Test 2", balance: 100 });
  await User.create({ firstName: "Test 3", balance: 5000 });
  await User.create({ firstName: "Test 4", balance: 0 });
  res.send();
};

export const showUserBalance = async (req, res, next) => {
  try {
    const userBalance = await getUserBalance(req.body.id);
    res.status(200).json({ Message: `Your balance: ${userBalance}$` });
  } catch (error) {
    next(error);
  }
};
