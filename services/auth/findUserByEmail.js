"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = void 0;
var user_model_1 = require("../../models/user.model");
var identifier_model_1 = require("../../models/identifier.model");
var findUserByEmail = function (email) {
    return user_model_1.UserModel.findOne({
        where: { email: email },
        include: {
            model: identifier_model_1.IdentifierModel,
            as: "identifier",
        },
    });
};
exports.findUserByEmail = findUserByEmail;
