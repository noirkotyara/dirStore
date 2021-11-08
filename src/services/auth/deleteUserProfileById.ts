import { UserModel } from "../../models/user.model";

export const deleteUserProfileById = async (userId: string) => {
  return await UserModel.destroy({ where: { id: userId } });
};
