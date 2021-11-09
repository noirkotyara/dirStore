import { UserAttributes } from "../../types/user/user-attributes";
import { UserModel } from "../../models/user.model";

export const updateUserProfileById = async (
  userId: string,
  userProfile: UserAttributes
): Promise<boolean> => {
  const [updatedRows] = await UserModel.update(userProfile, {
    where: { id: userId },
  });
  return updatedRows === 1;
};
