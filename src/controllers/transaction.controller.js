import { increaseUserBalance, decreaseUserBalance, getAllUserTransactions } from "../services/transaction.service.js";

export const createAddTransaction = async (req, res, next) => {
  try {
    await increaseUserBalance(req.body.id, req.body.type, req.body.amount, req.body.status);
    res.status(200).json({ Message: `Your balance has been successfully topped up with ${req.body.amount}$.` });
  } catch (error) {
    next(error);
  }
};

export const createReduceTransaction = async (req, res, next) => {
  try {
    await decreaseUserBalance(req.body.id, req.body.type, req.body.amount, req.body.status);
    res.status(200).json({ Message: `${req.body.amount}$ has been taken from your balance.` });
  } catch (error) {
    next(error);
  }
};

/*export const createTransferTransaction = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};*/

export const showTransactions = async (req, res, next) => {
  try {
    const allUserTransactions = await getAllUserTransactions(req.body.id);
    res.status(200).json({ allUserTransactions });
  } catch (error) {
    next(error);
  }
};
