import { UserModel } from "../../models/user.model";
import { IdentifierModel } from "../../models/identifier.model";

export const findUserProfileById = (userId: string) => {
  return UserModel.findOne({
    where: { id: userId },
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
};
