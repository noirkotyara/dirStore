import { Op } from "sequelize";

export const greaterThanOperator = (fieldName: string, fieldValue?: number): { [key: string]: unknown } | {} => {
  if (fieldValue) {
    return { [fieldName]: { [Op.gte]: fieldValue } };
  }
  return {};
};