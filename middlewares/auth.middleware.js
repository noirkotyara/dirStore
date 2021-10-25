var expressValidation = require("express-validation");
var responseController = require("./../controllers/response.controller");
var jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    var token = req.headers["x-access-token"];

    if (!token)
      return responseController.sendResponse(
        responseController.RESPONSE_CODE.PROCESS_ERROR,
        "A token is required for authentication",
        res,
        403
      );

    req.user = jwt.verify(token, process.env.JWT_S);
    return next();
  } catch (error) {
    return responseController.sendResponse(
      responseController.RESPONSE_CODE.PROCESS_ERROR,
      error.message,
      res,
      401
    );
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
