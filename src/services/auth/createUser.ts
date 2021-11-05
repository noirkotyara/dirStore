import { UserAttributes } from "../../types/User";

import { UserModel } from "../../models/user.model";
import { IdentifierModel } from "../../models/identifier.model";

export const createUser = async (userInfo: UserAttributes) => {
  return await UserModel.create(userInfo, {
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
};
