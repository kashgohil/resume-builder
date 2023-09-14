export function _omit(object: Record<string, any>, keysToOmit: string[]) {
  let newObject: any = {};
  for (let key in keysToOmit) {
    if (object[key]) continue;
    newObject[key] = object[key];
  }

  return newObject;
}
