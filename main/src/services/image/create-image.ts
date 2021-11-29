import { ImageModel } from "@models/image.model";

export const createImages = async (imagesId: string[]): Promise<string[] | null> => {
  const createdImages = await ImageModel.bulkCreate(
    imagesId.map((id) => ({ id: id.split(".")[0], name: id }))
  );

  return createdImages.length === 0
    ? null
    : createdImages.map(image => image.get().id);
};
