import { UserAttributes } from "@types-internal/user/user-attributes";

import { UserModel } from "@models/user.model";
import { IdentifierModel } from "@models/identifier.model";

export const createUser = async (
  userInfo: UserAttributes
): Promise<UserAttributes> => {
  const createdUser = await UserModel.create(userInfo, {
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
  return createdUser.get();
};
