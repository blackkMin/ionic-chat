import {NgModule} from "@angular/core";
import {DynamicFormDescPage} from "./dynamic-form-desc";
import {IonicPageModule} from "ionic-angular";

@NgModule({
    declarations: [
        DynamicFormDescPage
    ],
    imports: [
        IonicPageModule.forChild(DynamicFormDescPage)
    ],
    exports: [
        DynamicFormDescPage
    ]
})

export class DynamicFormDescModule{

}