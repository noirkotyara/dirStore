import { UserModel } from "../../models/user.model";
import { IdentifierModel } from "../../models/identifier.model";

export const findUserById = async (userId: string) => {
  return await UserModel.findOne({
    where: { id: userId },
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
};
