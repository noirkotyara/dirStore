var redis = require("redis");

var expressValidation = require("express-validation");
var jwt = require("jsonwebtoken");

var responseMiddleware = require("message-catcher");

var redisClient = redis.createClient(process.env.R_PORT);

function verifyToken(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    var token = req.headers["x-access-token"];

    if (!token)
      return next({
        responseCode: responseMiddleware.RESPONSE_CODES.P_ERROR__UNAUTHORIZED,
        data: "A token is required for authentication",
      });

    var tokenUser = jwt.verify(token, process.env.JWT_S);

    req.user = tokenUser;
    redisClient.set(tokenUser.userId, tokenUser.type);

    next();
  } catch (error) {
    next({
      responseCode: responseMiddleware.RESPONSE_CODES.P_ERROR__FORBIDDEN,
      data: error.message,
    });
  }
}

var registerUserValidation = {
  body: expressValidation.Joi.object({
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
