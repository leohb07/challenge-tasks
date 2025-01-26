import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) {
  const errorStatus = 500;
  const errorMessage = err.message || "Internal Server Error!";

  res.status(errorStatus).send({
    success: false,
    message: errorMessage,
  });
}
