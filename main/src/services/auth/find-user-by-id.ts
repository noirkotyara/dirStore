import { UserModel } from "@models/user.model";
import { IdentifierModel } from "@models/identifier.model";

import { UserAttributes } from "@types-internal/user/user-attributes";

export const findUserById = async (
  userId: string
): Promise<UserAttributes | null> => {
  const foundedUser = await UserModel.findOne({
    where: { id: userId },
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
  return foundedUser ? foundedUser.get() : null;
};
