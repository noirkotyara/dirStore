var expressValidation = require("express-validation");

var createDelivererValidation = {
  body: expressValidation.Joi.object({
    name: expressValidation.Joi.string().max(25).required(),
    description: expressValidation.Joi.string().max(150).required(),
    phone: expressValidation.Joi.string().length(12),
    address: expressValidation.Joi.string().required(),
    deliveryPrice: expressValidation.Joi.number().default(0),
  }),
};

var updateDelivererValidation = {
  body: expressValidation.Joi.object({
    name: expressValidation.Joi.string().max(25),
    description: expressValidation.Joi.string().max(150),
    phone: expressValidation.Joi.string().length(12),
    address: expressValidation.Joi.string(),
    deliveryPrice: expressValidation.Joi.number(),
  }),
};

module.exports = {
  createDelivererValidation: expressValidation.validate(
    createDelivererValidation,
    {},
    {}
  ),
  updateDelivererValidation: expressValidation.validate(
    updateDelivererValidation,
    {},
    {}
  ),
};
