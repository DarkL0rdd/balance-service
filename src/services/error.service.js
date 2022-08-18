export class CustomError extends Error {
  status = 400;
  constructor(status, message) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
