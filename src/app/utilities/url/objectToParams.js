"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}
/**
 * Converts an object to a parametrised string.
 * @param object
 * @returns {string}
 */
function objectToParams(object) {
    return Object.keys(object).map(function (key) { return isJsObject(object[key]) ?
        subObjectToParams(encodeURIComponent(key), object[key]) :
        encodeURIComponent(key) + "=" + encodeURIComponent(object[key]); }).join('&');
}
exports.objectToParams = objectToParams;
/**
 * Converts a sub-object to a parametrised string.
 * @param object
 * @returns {string}
 */
function subObjectToParams(key, object) {
    return Object.keys(object).map(function (childKey) { return isJsObject(object[childKey]) ?
        subObjectToParams(key + "[" + encodeURIComponent(childKey) + "]", object[childKey]) :
        key + "[" + encodeURIComponent(childKey) + "]=" + encodeURIComponent(object[childKey]); }).join('&');
}
