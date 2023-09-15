export function _omit(
  object: Record<string, any>,
  keysToOmit: string[],
): Record<string, any> | undefined {
  let newObject: any = {};
  for (let key in keysToOmit) {
    if (object[key]) continue;
    newObject[key] = object[key];
  }

  return newObject;
}

export function _isNil(value: any) {
  return value == undefined;
}

export function _isEmpty(value: any): boolean {
  if (Array.isArray(value)) return !value.length;
  if (typeof value === "object") return !Object.keys(value).length;
  return !value;
}
