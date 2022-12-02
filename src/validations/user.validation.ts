import Joi from "joi";

export const createUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  token: Joi.string().token().required(),
});
