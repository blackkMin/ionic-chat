import {AbstractControl, FormControl} from '@angular/forms';
export function validateMobile(c: AbstractControl) {
    let MOBILE_REGEXP = /^1[0-9]{10,10}$/;
    return MOBILE_REGEXP.test(c.value) ? {validateMobile: {valid: false}} : null;
}
