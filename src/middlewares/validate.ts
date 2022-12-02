import type { Response, Request, NextFunction } from "express";

const validate =
  (schema: any) =>
  (request: Request, response: Response, next: NextFunction) => {
    const { error } = schema.validate(request.body);

    if (error) {
      return next(
        response.status(422).json({
          error,
          message: "Invalid body",
        })
      );
    }

    return next();
  };

export default validate;
