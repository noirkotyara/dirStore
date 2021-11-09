"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserProfileById = void 0;
var user_model_1 = require("../../models/user.model");
var deleteUserProfileById = function (userId) {
    return user_model_1.UserModel.destroy({ where: { id: userId } });
};
exports.deleteUserProfileById = deleteUserProfileById;
