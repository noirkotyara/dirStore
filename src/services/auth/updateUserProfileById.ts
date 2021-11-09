import { UserAttributes } from "../../types/User";
import { UserModel } from "../../models/user.model";

export const updateUserProfileById = (
  userId: string,
  userProfile: UserAttributes
) => {
  return UserModel.update(userProfile, { where: { id: userId } });
};
