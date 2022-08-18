import { validationResult } from "express-validator";

export const validateRequestSchema = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }
    next();
  } catch (err) {
    next(err);
  }
};
