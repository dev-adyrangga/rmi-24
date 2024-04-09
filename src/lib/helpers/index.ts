export const deepClone = <T>(data: T): T => JSON.parse(JSON.stringify(data))

export const isValidStrObj = (value: string) => value && (value?.[0] === '{' || value?.[0] === '[')
