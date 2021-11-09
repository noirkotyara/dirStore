import { UserModel } from "../../models/user.model";
import { IdentifierModel } from "../../models/identifier.model";

export const findUserById = (userId: string) => {
  return UserModel.findOne({
    where: { id: userId },
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
};
