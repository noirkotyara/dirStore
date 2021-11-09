import { UserModel } from "../../models/user.model";

export const deleteUserProfileById = async (
  userId: string
): Promise<boolean> => {
  const deletedRows = await UserModel.destroy({ where: { id: userId } });
  return deletedRows === 1;
};
