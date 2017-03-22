function isJsObject(o) {
    return o !== null && (typeof o === 'function' || typeof o === 'object') && !(o instanceof Date);
}
function isJsDate(o) {
    return o instanceof Date;
}
function dateToJSON(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}
/**
 * Converts an object to a parametrised string.
 * @param object
 * @returns {string}
 */
export function objectToFormData(object) {
    var formData = new FormData();
    Object.keys(object).forEach(function (key) {
        if (isJsDate(object[key])) {
            formData.append(key, dateToJSON(object[key]));
        }
        else {
            if (isJsObject(object[key])) {
                formData = subObjectToFormData(key, object[key], formData);
            }
            else {
                formData.append(key, object[key]);
            }
        }
    });
    return formData;
}
/**
 * Converts a sub-object to a parametrised string.
 * @param key
 * @param object
 * @param formData
 * @returns {string}
 */
function subObjectToFormData(key, object, formData) {
    Object.keys(object).forEach(function (childKey) {
        if (isJsObject(object[childKey])) {
            formData = subObjectToFormData(childKey, object[childKey], formData);
        }
        else {
            formData.append(childKey, object[childKey]);
        }
    });
    return formData;
}
//# sourceMappingURL=/Users/pedrogorrin/Documents/Trabajo/etrack/web/src/app/utilities/form/objectToFormData.js.map