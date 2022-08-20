import { User } from "../models/User.js";
import { Transaction } from "../models/Transaction.js";
import { CustomError } from "../services/error.service.js";
import { arrayStatus, arrayType } from "../services/arrays.js";
import { startOfDay, endOfDay } from "date-fns";

const getSum = (total, currentValue) => {
  return total + currentValue.amount;
};

export const increaseUserBalance = async (userId, amountTransaction) => {
  if (amountTransaction <= 0) throw new CustomError(400, "Replenishment amount must be greater than 0");

  const replenishmentTransaction = await Transaction.create({
    user: `${userId}`,
    type: arrayType[0],
    amount: amountTransaction,
    status: arrayStatus[0],
  });
  if (!replenishmentTransaction) throw new CustomError(500, "Transaction create error.");

  const user = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $push: { transactions: replenishmentTransaction },
    }
  );
  if (!user) throw new CustomError(500, "User not found.");

  const userOldBalance = user.balance;
  const userNewBalance = userOldBalance + amountTransaction;

  const updateUserBalance = await User.findByIdAndUpdate(userId, {
    balance: userNewBalance,
  });
  if (!updateUserBalance) throw new CustomError(500, "Balance update error.");

  if (userOldBalance !== userNewBalance) {
    const userReplenishmentTransactionStatus = await Transaction.findByIdAndUpdate(replenishmentTransaction._id, {
      status: arrayStatus[1],
    });
  } else {
    const userReplenishmentTransactionStatus = await Transaction.findByIdAndUpdate(replenishmentTransaction._id, {
      status: arrayStatus[2],
    });
    throw new CustomError(500, "Balance replenishment error.");
  }
};

export const decreaseUserBalance = async (userId, amountTransaction) => {
  if (amountTransaction <= 0) throw new CustomError(400, "Replenishment amount must be greater than 0");

  const user = await User.findById(userId);
  if (!user) throw new CustomError(500, "User not found.");
  const userOldBalance = user.balance;
  if (userOldBalance < amountTransaction) throw new CustomError(400, "User balance is not enough.");

  const transaction = await Transaction.create({
    user: `${userId}`,
    type: arrayType[1],
    amount: amountTransaction,
    status: arrayStatus[0],
  });
  if (!transaction) throw new CustomError(500, "Transaction create error.");

  user.update({
    $push: { transactions: transaction },
  });

  const userNewBalance = userOldBalance - amountTransaction;

  const updateUserBalance = await User.findByIdAndUpdate(userId, {
    balance: userNewBalance,
  });
  if (!updateUserBalance) throw new CustomError(500, "Balance update error.");
};

export const transferToAnotherUser = async (userId, amountTransaction, destinationId) => {
  if (amountTransaction <= 0) throw new CustomError(400, "Transfer amount must be greater than 0");

  const user = await User.findById(userId);
  if (!user) throw new CustomError(500, "User not found.");
  const userOldBalance = user.balance;
  if (userOldBalance < amountTransaction) throw new CustomError(400, "User balance is not enough.");

  const transaction = await Transaction.create({
    user: `${userId}`,
    type: arrayType[2],
    amount: amountTransaction,
    status: arrayStatus[0],
  });

  const destinationUser = await User.findById(destinationId);
  if (!destinationUser) throw new CustomError(500, "Destination user not found.");
  const destinationUserOldBalance = destinationUser.balance;
  const destinationUserNewBalance = destinationUserOldBalance + amountTransaction;

  const destinationUserUpdate = await User.findByIdAndUpdate(destinationId, {
    balance: destinationUserNewBalance,
  });
  if (!destinationUserUpdate) throw new CustomError(500, "Destination user balance update error.");

  const destinationUserTransaction = await Transaction.create({
    user: `${destinationId}`,
    type: arrayType[2],
    amount: amountTransaction,
    status: arrayStatus[0],
  });
  if (!destinationUserTransaction) throw new CustomError(500, "Destination user transaction create error.");

  const destinationUserUpdateTransaction = await User.findByIdAndUpdate(destinationId, {
    $push: { transactions: destinationUserTransaction },
  }).populate("transactions");
  if (!destinationUserUpdateTransaction) throw new CustomError(500, "Destination user transaction update error.");

  const userUpdateTransaction = await User.findByIdAndUpdate(userId, {
    $push: { transactions: transaction },
  }).populate("transactions");
  if (!userUpdateTransaction) throw new CustomError(500, "User transaction update error.");

  const userNewBalance = userOldBalance - amountTransaction;
  const userUpdateBalance = await User.findByIdAndUpdate(userId, {
    balance: userNewBalance,
  }).populate("transactions");
  if (!userUpdateBalance) throw new CustomError(500, "User balance update error.");

  if (userOldBalance !== userNewBalance) {
    const userTransactionStatus = await Transaction.findByIdAndUpdate(transaction._id, {
      status: arrayStatus[1],
    });
  } else {
    const userTransactionStatus = await Transaction.findByIdAndUpdate(transaction._id, {
      status: arrayStatus[2],
    });
    throw new CustomError(500, "Transfer error.");
  }

  if (destinationUserOldBalance !== destinationUserNewBalance) {
    const destinationUserTransactionStatus = await Transaction.findByIdAndUpdate(destinationUserTransaction._id, {
      status: arrayStatus[1],
    });
  } else {
    const destinationUserTransactionStatus = await Transaction.findByIdAndUpdate(destinationUserTransaction._id, {
      status: arrayStatus[2],
    });
    throw new CustomError(500, "Transfer error.");
  }
};

export const getAllUserTransactions = async (userId) => {
  const user = await User.findById(userId).populate("transactions");
  if (!user) throw new CustomError(500, "User not found.");
  if (!user.transactions.length) throw new CustomError(400, "Transactions not found.");

  const userTransactions = user.transactions;
  if (!userTransactions) throw new CustomError(500, "User transactions not found.");
  return userTransactions;
};
