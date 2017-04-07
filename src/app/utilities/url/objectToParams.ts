function isJsObject(o: any) {
  return o !== null && (typeof o === 'function' || typeof o === 'object');
}
/**
 * Converts an object to a parametrised string.
 * @param object
 * @returns {string}
 */
export function objectToParams(object): string {
  return Object.keys(object).map((key) => isJsObject(object[key]) ?
    subObjectToParams(encodeURIComponent(key), object[key]) :
    `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
  ).join('&');
}

/**
 * Converts a sub-object to a parametrised string.
 * @param object
 * @returns {string}
 */
function subObjectToParams(key, object): string {
  return Object.keys(object).map((childKey) => isJsObject(object[childKey]) ?
    subObjectToParams(`${key}[${encodeURIComponent(childKey)}]`, object[childKey]) :
    `${key}[${encodeURIComponent(childKey)}]=${encodeURIComponent(object[childKey])}`
  ).join('&');
}
