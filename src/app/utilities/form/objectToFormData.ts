import {isArray} from "util";
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
  Object.keys(object).forEach((property) => {
      if (isArray(object[property])) {
        for (let i = 0; i < object[property].length; i++) {
          formData = arrayToFormData(object[property][i], formData, property + '[' + i + ']')
        }
      } else {
        if (isJsDate(object[property])) {
          formData.append(property, dateToJSON(object[property]))
        } else {
          if (isJsObject(object[property])) {
            formData = subObjectToFormData(property, object[property], formData)
          } else {
            formData.append(property, object[property])
          }
        }
      }
    }
  );
  return formData;
}
/**
 * Converts an array to a parametrised string.
 * @param object
 * @param namespace
 * @param formData
 * @returns {string}
 */
function arrayToFormData(object, formData, namespace) {
  // if the property is an object, but not a File or an Array,
  // use recursivity.
  let formKey;
  for (let property in object) {
    if (object.hasOwnProperty(property) && object[property]) {
      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if ((typeof object[property] === 'object' && !(object[property] instanceof File)) || isArray(object[property])) {
        if (isArray(object[property])) {
          for (let i = 0; i < object[property].length; i++) {
            formData = arrayToFormData(object[property][i], formData, property + '[' + i + ']')
          }
        } else {
          formData = subObjectToFormData(property, object, formData);
        }
      } else {
        formData.append(formKey, object[property]);
      }
    }
  }

  return formData;
}

/**
 * Converts a sub-object to a parametrised string.
 * @param property
 * @param object
 * @param formData
 * @returns {string}
 */
function subObjectToFormData(property: string, object, formData: FormData): FormData {
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
