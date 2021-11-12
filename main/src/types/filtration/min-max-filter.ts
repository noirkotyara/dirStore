export type MinMaxFilter = { max?: string | number | undefined, min?: string | number | undefined }

export type MinMaxFormat<Type> = {
  min?: Type,
  max?: Type
}