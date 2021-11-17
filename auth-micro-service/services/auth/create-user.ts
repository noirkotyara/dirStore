import { UserAttributes } from "@types-internal/user/user-attributes";
import { UserModel } from "@models/user.model";
import { IdentifierModel } from "@models/identifier.model";

export const createUser = async (
  userInfo: UserAttributes
): Promise<UserAttributes | null> => {

  try {
    // method to use methods from class
    // const { identifier, ...userProfile } = userInfo;
    // const createdUser = await UserModel.create(userProfile);
    // const createdIdentifier = await createdUser.createIdentifier(identifier);
    // return createdUser.get();

    const createdUserWithProfile = await UserModel.create(userInfo, {
      include: {
        model: IdentifierModel,
        as: "identifier"
      }
    });
    return createdUserWithProfile.get();

  } catch (error) {
    return null;
  }
};
