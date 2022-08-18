import router from "express";
import { createAddTransaction } from "../controllers/transaction.controller.js";

export const transactionRouter = router();

transactionRouter.post("/add", createAddTransaction);
//transactionRouter.post("/reduce", createReduceTransaction);
//transactionRouter.post("/transfer", createTransferTransaction);
//transactionRouter.get("/show", showTransactions);
