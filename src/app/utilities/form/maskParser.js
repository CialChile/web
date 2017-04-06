"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseMask(stringMask) {
    var mask = [];
    for (var maskChar in stringMask) {
        if (stringMask[maskChar] === '0') {
            mask.push(/\d/);
        }
        else if (stringMask[maskChar] === 'A') {
            mask.push(/[A-Z0-9]/);
        }
        else if (stringMask[maskChar] === 'L') {
            mask.push(/[A-Z]/);
        }
        else {
            mask.push(stringMask[maskChar]);
        }
    }
    return mask;
}
exports.parseMask = parseMask;
