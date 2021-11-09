import { UserModel } from "../../models/user.model";
import { IdentifierModel } from "../../models/identifier.model";

export const findUserByEmail = (email: string) => {
  return UserModel.findOne({
    where: { email },
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
};
