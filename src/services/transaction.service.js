import { User } from "../models/User.js";
import { Transaction } from "../models/Transaction.js";
import { CustomError } from "../services/error.service.js";
import { arrayStatus, arrayType } from "../services/arrays.js";
import { startOfDay, endOfDay } from "date-fns";

/*function getSum(total, currentValue) {
  return total + currentValue.amount;
}*/

export const sumTotalUserBalance = async (userId, typeTransaction, amountTransaction) => {
  const transaction = await Transaction.create({
    user: `${userId}`,
    type: typeTransaction,
    amount: amountTransaction,
    status: arrayStatus[0],
  });

  const user = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $push: { transactions: transaction },
    }
  );

  const oldUserBalance = user.balance;

  const allUserReplenishmentTransactions = await User.findById(userId).populate({
    path: "transactions",
    match: {
      status: arrayStatus[0],
      createdAt: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date()),
      },
    },
  });

  const testBalance = await User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId.userId,
      },
    },
    {
      $unwind: "$transactions",
    },
    {
      $group: {
        _id: "$_id",
        sum: { $sum: "$transactions.amount" },
      },
    },
  ]);
  console.log(testBalance);

  /*const totalAmount = allUserReplenishmentTransactions.transactions.reduce(getSum, 0);
  console.log(totalAmount);

  const updateUserBalance = await User.findByIdAndUpdate(userId, {
    balance: totalAmount,
  });
  console.log(updateUserBalance.balance);

  const newUserBalance = await User.findById(userId);

  console.log(oldUserBalance);

  if (oldUserBalance !== newUserBalance.balance) {
    const userTransactionStatus = await Transaction.findByIdAndUpdate(transaction._id, {
      status: arrayStatus[1],
    });
  } else {
    const userTransactionStatus = await Transaction.findByIdAndUpdate(transaction._id, {
      status: arrayStatus[2],
    });
    throw new CustomError(500, "Balance replenishment error.");
  }*/
};
