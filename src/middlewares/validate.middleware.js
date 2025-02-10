import { CustomError } from "./error.middleware.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    const zodError = error.errors[0];
    next(new CustomError(zodError.message, 400));
  }
};
