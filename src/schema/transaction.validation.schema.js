import { body } from "express-validator";
import { arrayType } from "../services/arrays.js";

export const transactionValidationSchema = [
  //id
  body("id").not().isEmpty().withMessage("User ID is required."),
  body("id").exists({ checkFalsy: true }).withMessage("User ID is required."),
  body("id").isString().withMessage("User ID must be a string."),
  body("id")
    .custom((value) => {
      const regex = /^\S*$/;
      if (regex.test(value)) return true;
    })
    .withMessage("No spaces are allowed in user ID."),

  //type
  body("type").not().isEmpty().withMessage("Transaction type is required"),
  body("type").exists({ checkFalsy: true }).withMessage("Transaction type is required."),
  body("type").isString().withMessage("Transaction type must be a string."),
  body("type").isIn(arrayType).withMessage("Transaction type error."),

  //amount
  body("amount").not().isEmpty().withMessage("Transaction amount is required."),
  body("amount").exists({ checkFalsy: true }).withMessage("Transaction amount is required."),
  body("amount").isInt({ gt: 0 }).withMessage("Transaction amount must be greater than 0."),
];
