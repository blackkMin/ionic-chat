import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DataBase} from "../../../providers/data-base";

@Component({
    selector: 'app-desc',
    templateUrl: './dynamic-form-desc.html'
})
export class DynamicFormDescPage {
    @Input() question: DataBase<any>;
    @Input() form: FormGroup;

    constructor() {
        // console.log(this.form.controls[this.question.key].valid);
    }

    get isValid() {
        return this.form.controls[this.question.key].valid;
    }
}
