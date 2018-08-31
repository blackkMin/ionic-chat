import {Injectable} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataBase} from "./data-base";
import {validateMobile} from "./mobile.validator";

@Injectable()
export class DynamicService{
    constructor(){

    }

    toFormGroup(formDatas: DataBase<any>[] ) {
        let group: any = {};

        formDatas.forEach(formData => {
            group[formData.key] = new FormControl(formData.value || '');
            if(formData.required)group[formData.key] = new FormControl(formData.value || '', Validators.required);
            if(formData.required && formData.isMobile)group[formData.key] = new FormControl(formData.value || '', [Validators.required,validateMobile]);


            console.log(group,'~~~');
        });
        return new FormGroup(group);
    }
}