import { UserModel } from "@models/user.model";

import { UserAttributes } from "@types-internal/user/user-attributes";
import { IdentifierModel } from "@models/identifier.model";

export const updateUserProfileById = async (
  userId: string,
  userProfile: UserAttributes
): Promise<boolean> => {
  const [updatedRows] = await UserModel.update(userProfile, {
    where: { id: userId }
  });
  if (userProfile.identifier) {
    await IdentifierModel.update(userProfile.identifier, {
      where: { userId }
    });
  }
  return updatedRows === 1;
};
