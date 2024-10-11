import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errorStatus = 500;
  const errorMessage = err.message || "Internal Server Error!";

  res.status(errorStatus).send({
    success: false,
    message: errorMessage,
    // issue: err.stack,
  });
}
