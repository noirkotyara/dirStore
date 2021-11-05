import { UserAttributes } from "../../types/User";
import { UserModel } from "../../models/user.model";

export const updateUserProfileById = async (
  userId: string,
  userProfile: UserAttributes
) => {
  return await UserModel.update(userProfile, { where: { id: userId } });
};
