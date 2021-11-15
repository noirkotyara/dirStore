import { UserModel } from "@models/user.model";
import { IdentifierModel } from "@models/identifier.model";

import { UserAttributes } from "@types-internal/user/user-attributes";

export const findUserByEmail = async (
  email: string
): Promise<UserAttributes | null> => {
  const foundedUser = await UserModel.findOne({
    where: { email },
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
  return foundedUser ? foundedUser.get() : null;
};
