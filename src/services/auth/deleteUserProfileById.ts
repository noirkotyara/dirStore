import { UserModel } from "../../models/user.model";

export const deleteUserProfileById = (userId: string) => {
  return UserModel.destroy({ where: { id: userId } });
};
