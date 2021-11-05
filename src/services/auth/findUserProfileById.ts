import { UserModel } from "../../models/user.model";
import { IdentifierModel } from "../../models/identifier.model";

export const findUserProfileById = async (userId: string) => {
  return await UserModel.findOne({
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
