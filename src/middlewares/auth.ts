import type { Response, Request, NextFunction } from "express";

export const tokenValidator = (
  request: any,
  response: Response,
  next: NextFunction
) => {
  const AUTH_HEADER: string = "authorization";
  console.log(request.headers);
  if (!request.headers[AUTH_HEADER]) {
    next(
      response.status(403).json({
        message: "Authentication Invalid.",
      })
    );
    return;
  }
  request.token = request.headers[AUTH_HEADER];
  // request the user with that token, call a service.
  return next();
};
