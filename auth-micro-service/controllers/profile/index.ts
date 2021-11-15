import { deleteUserProfile } from "@controllers/profile/delete-user-profile";
import { updateUserProfile } from "@controllers/profile/update-user-profile";
import { getUserProfile } from "@controllers/profile/get-user-profile";

export const profileController = {
  deleteUserProfile,
  updateUserProfile,
  getUserProfile
};