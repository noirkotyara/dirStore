var expressValidation = require("express-validation");
var jwt = require("jsonwebtoken");

var RESPONSE_CODE = require("./../enums/responseCodes");

function verifyToken(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    var token = req.headers["x-access-token"];

    if (!token)
      return next({
        responseCode: RESPONSE_CODE.P_ERROR__UNAUTHORIZED,
        data: "A token is required for authentication",
      });

    req.user = jwt.verify(token, process.env.JWT_S);

    next();
  } catch (error) {
    next({
      responseCode: RESPONSE_CODE.P_ERROR__FORBIDDEN,
      data: error.message,
    });
  }
}

var registerUserValidation = {
  body: expressValidation.Joi.object({
    firstName: expressValidation.Joi.string().max(50).required(),
    lastName: expressValidation.Joi.string().max(50).required(),
    email: expressValidation.Joi.string().normalize().email().required(),
    password: expressValidation.Joi.string().min(6).required(),
    phone: expressValidation.Joi.string().max(15),
    type: expressValidation.Joi.string(),
  }),
};

var loginUserValidation = {
  body: expressValidation.Joi.object({
    email: expressValidation.Joi.string().email().required(),
    password: expressValidation.Joi.string().min(6).required(),
    type: expressValidation.Joi.string(),
  }),
};

module.exports = {
  verifyToken: verifyToken,
  registerUserValidation: expressValidation.validate(
    registerUserValidation,
    {},
    {}
  ),
  loginUserValidation: expressValidation.validate(loginUserValidation, {}, {}),
};
