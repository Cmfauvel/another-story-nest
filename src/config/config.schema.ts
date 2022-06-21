import * as Joi from "joi";

export const configValidationSchema = Joi.object({
  STAGE: Joi.string(),
  APP_PORT: Joi.number().default(1001),
  APP_GLOBAL_PREFIX: Joi.string().default("api"),
  JWT_SECRET: Joi.string(),
  JWT_EXP_H: Joi.string().default("3600s"),
  JWT_EXP_D: Joi.string().default("1d"),
});
