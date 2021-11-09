"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfileById = void 0;
var user_model_1 = require("../../models/user.model");
var updateUserProfileById = function (userId, userProfile) {
    return user_model_1.UserModel.update(userProfile, { where: { id: userId } });
};
exports.updateUserProfileById = updateUserProfileById;
