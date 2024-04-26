import { intersectionWith, isEqual, mergeWith, unionWith, isArray, isObject } from "lodash-es";


export function setObjToUrlParams(baseUrl: string, obj: Record<string, string>): string{
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, ''); // 去除最后一个&

  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<
  T extends object | null | undefined,
  U extends object | null | undefined,
>(
  source: T,
  target: U,
  mergeArrays: "union" | "intersection" | "concat" | "replace" = "replace",
): T & U {
  if (!target) {
    return source as T & U;
  }
  if (!source) {
    return target as T & U;
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case "union":
          return unionWith(sourceValue, targetValue, isEqual);
        case "intersection":
          return intersectionWith(sourceValue, targetValue, isEqual);
        case "concat":
          return sourceValue.concat(targetValue);
        case "replace":
          return targetValue;
        default:
          throw new Error(
            `Unknown merge array strategy: ${mergeArrays as string}`,
          );
      }
    }
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays);
    }
    return undefined;
  });
}
