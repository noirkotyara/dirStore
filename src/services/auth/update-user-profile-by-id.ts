import { UserModel } from "@models/user.model";

import { UserAttributes } from "@types-internal/user/user-attributes";

export const updateUserProfileById = async (
  userId: string,
  userProfile: UserAttributes
): Promise<boolean> => {
  const [updatedRows] = await UserModel.update(userProfile, {
    where: { id: userId },
  });
  return updatedRows === 1;
};
