import { CustomError } from "../services/error.service.js";

export const errorHandler = (err, req, res, next) => {
  console.log("Error-handler: ", err);
  let customError = err;
  if (!(err instanceof CustomError)) {
    customError = new CustomError(500, "Server Error");
  }
  res.status(customError.status).json({ Message: customError.message });
};
