import { UserModel } from "../../models/user.model";
import { IdentifierModel } from "../../models/identifier.model";
import { UserAttributes } from "../../types/user/user-attributes";

export const findUserProfileById = async (
  userId: string
): Promise<UserAttributes | null> => {
  const foundedUser = await UserModel.findOne({
    where: { id: userId },
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: IdentifierModel,
      as: "identifier",
    },
  });
  return foundedUser ? foundedUser.get() : null;
};
