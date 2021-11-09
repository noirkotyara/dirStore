"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserProfileById = void 0;
var user_model_1 = require("../../models/user.model");
var identifier_model_1 = require("../../models/identifier.model");
var findUserProfileById = function (userId) {
    return user_model_1.UserModel.findOne({
        where: { id: userId },
        attributes: {
            exclude: ["password"],
        },
        include: {
            model: identifier_model_1.IdentifierModel,
            as: "identifier",
        },
    });
};
exports.findUserProfileById = findUserProfileById;
