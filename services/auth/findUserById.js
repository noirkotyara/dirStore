"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = void 0;
var user_model_1 = require("../../models/user.model");
var identifier_model_1 = require("../../models/identifier.model");
var findUserById = function (userId) {
    return user_model_1.UserModel.findOne({
        where: { id: userId },
        include: {
            model: identifier_model_1.IdentifierModel,
            as: "identifier",
        },
    });
};
exports.findUserById = findUserById;
