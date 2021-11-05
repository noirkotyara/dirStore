import { UserModel } from "../../models/user.model";
import { IdentifierModel } from "../../models/identifier.model";

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({
    where: { email },
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
};
