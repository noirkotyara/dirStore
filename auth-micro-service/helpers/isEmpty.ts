export const isEmpty = <ObjType>(obj: ObjType) => {
  return Object.keys(obj).length === 0;
};