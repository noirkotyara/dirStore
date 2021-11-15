import { Op } from "sequelize";

export const likeOperator = (fieldName: string, fieldValue: unknown): { [key: string]: unknown } | {} => {
  if (fieldValue) {
    return { [fieldName]: { [Op.substring]: fieldValue } };
  }
  return {};
};