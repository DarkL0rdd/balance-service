import { body } from "express-validator";

export const userValidationSchema = [
  //id
  body("id").not().isEmpty().withMessage("User ID is required."),
  body("id").isString().withMessage("User ID must be a string."),
  body("id").exists({ checkFalsy: true }).withMessage("User ID is required."),
  body("id")
    .custom((value) => {
      !/\s/.test(value);
    })
    .withMessage("No spaces are allowed in user ID."),
];
