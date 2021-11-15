import expressValidation, { Joi } from "express-validation";

const createCheckoutValidation = {
  body: Joi.object({
    providersIds: Joi.array().items(Joi.string()).required().min(1),
  }),
};

export = {
  createCheckoutValidation: expressValidation.validate(
    createCheckoutValidation,
    {},
    {}
  ),
};
