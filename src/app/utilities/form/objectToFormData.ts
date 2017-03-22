function isJsObject(o: any) {
  return o !== null && (typeof o === 'function' || typeof o === 'object') && !(o instanceof Date);
}

function isJsDate(o: any) {
  return o instanceof Date;
}

function dateToJSON(date) {
  let local = new Date(date);
  local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}

/**
 * Converts an object to a parametrised string.
 * @param object
 * @returns {string}
 */
export function objectToFormData(object): FormData {
  let formData: FormData = new FormData();
  Object.keys(object).forEach((key) => {
      if (isJsDate(object[key])) {
        formData.append(key, dateToJSON(object[key]))
      } else {
        if (isJsObject(object[key])) {
          formData = subObjectToFormData(key, object[key], formData)
        } else {
          formData.append(key, object[key])
        }
      }
    }
  );
  return formData;
}

/**
 * Converts a sub-object to a parametrised string.
 * @param key
 * @param object
 * @param formData
 * @returns {string}
 */
function subObjectToFormData(key: string, object, formData: FormData): FormData {
  Object.keys(object).forEach((childKey) => {
      if (isJsObject(object[childKey])) {
        formData = subObjectToFormData(childKey, object[childKey], formData);
      } else {
        formData.append(childKey, object[childKey])
      }
    }
  );

  return formData;
}
