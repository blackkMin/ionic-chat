import { FormControl } from '@angular/forms';
export function validateMobile(c: FormControl) {
    let MOBILE_REGEXP = /^1[0-9]{10,10}$/;
    return MOBILE_REGEXP.test(c.value) ? null : {
        validateMobile: {valid: false}
    }
}