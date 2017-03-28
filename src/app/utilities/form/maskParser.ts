export function parseMask(stringMask) {
  let mask = [];
  for (let maskChar in stringMask) {
    if (stringMask[maskChar] === '0') {
      mask.push(/\d/)
    } else if (stringMask[maskChar] === 'A') {
      mask.push(/[A-Z0-9]/)
    } else if (stringMask[maskChar] === 'L') {
      mask.push(/[A-Z]/)
    } else {
      mask.push(stringMask[maskChar])
    }
  }

  return mask;
}
