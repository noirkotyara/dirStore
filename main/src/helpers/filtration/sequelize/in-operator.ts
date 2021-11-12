import { Op } from "sequelize";
import { parseIntoArray } from "@helpers/filtration/parse-into-array";

export const inOperator = (fieldName: string, fieldValue?: string): { [key: string]: unknown } | {} => {
  if (fieldValue) {
    const arrayOfValues = parseIntoArray(fieldValue);
    return { [fieldName]: { [Op.in]: arrayOfValues } };
  }
  return {};
};