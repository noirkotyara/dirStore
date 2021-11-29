var expressValidation = require("express-validation");

var createProductValidation = {
  body: expressValidation.Joi.object({
    name: expressValidation.Joi.string().max(25).required(),
    price: expressValidation.Joi.number(),
    amount: expressValidation.Joi.number().required(),
    description: expressValidation.Joi.string().max(150).required(),
    images: expressValidation.Joi.array().items(expressValidation.Joi.string())
  })
};

var updateProductValidation = {
  body: expressValidation.Joi.object({
    name: expressValidation.Joi.string().max(25),
    price: expressValidation.Joi.number(),
    amount: expressValidation.Joi.number(),
    description: expressValidation.Joi.string().max(150)
  })
};

module.exports = {
  createProductValidation: expressValidation.validate(
    createProductValidation,
    {},
    {}
  ),
  updateProductValidation: expressValidation.validate(
    updateProductValidation,
    {},
    {}
  )
};
