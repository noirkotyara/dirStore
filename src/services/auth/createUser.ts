import { UserAttributes } from "../../types/User";

import { UserModel } from "../../models/user.model";
import { IdentifierModel } from "../../models/identifier.model";

export const createUser = (userInfo: UserAttributes) => {
  return UserModel.create(userInfo, {
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
};
