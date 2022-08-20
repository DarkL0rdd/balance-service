import router from "express";
import {
  createAddTransaction,
  createReduceTransaction,
  createTransferTransaction,
  showTransactions,
} from "../controllers/transaction.controller.js";
import { validateRequestSchema } from "../middleware/validate.request.schema.js";
import { transactionValidationSchema } from "../schema/transaction.validation.schema.js";

export const transactionRouter = router();

transactionRouter.post("/add", transactionValidationSchema, validateRequestSchema, createAddTransaction);
transactionRouter.post("/reduce", transactionValidationSchema, validateRequestSchema, createReduceTransaction);
transactionRouter.post("/transfer", transactionValidationSchema, validateRequestSchema, createTransferTransaction);
transactionRouter.get("/show", showTransactions);
