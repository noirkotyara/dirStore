import { Op } from "sequelize";

export const inOperator = (fieldName: string, arrayOfValues?: string[]): { [key: string]: unknown } | {} => {
  if (arrayOfValues) {
    return { [fieldName]: { [Op.in]: arrayOfValues } };
  }
  return {};
};