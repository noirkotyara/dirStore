import { UserModel } from "@models/user.model";

import { UserAttributes } from "@types-internal/user/user-attributes";
import { IdentifierModel } from "@models/identifier.model";
import { isEmpty } from "@helpers/isEmpty";

export const updateUserProfileById = async (
  userId: string,
  userProfile: UserAttributes
): Promise<boolean> => {
  try {
    const { identifier, ...profile } = userProfile;

    if (!isEmpty<UserAttributes>(profile)) {
      await UserModel.update(userProfile, {
        where: { id: userId }
      });
    }

    if (identifier) {
      await IdentifierModel.update(identifier, {
        where: { userId }
      });
    }
    return true;
  } catch (error) {
    return false;
  }
};
