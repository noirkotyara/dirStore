"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
var user_model_1 = require("../../models/user.model");
var identifier_model_1 = require("../../models/identifier.model");
var createUser = function (userInfo) {
    return user_model_1.UserModel.create(userInfo, {
        include: {
            model: identifier_model_1.IdentifierModel,
            as: "identifier",
        },
    });
};
exports.createUser = createUser;
