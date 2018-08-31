import {NgModule} from "@angular/core";
import {DynamicFormPage} from "./dynamic-form";
import {IonicPageModule} from "ionic-angular";
import {DynamicService} from "../../providers/dynamic.service";
import {DynamicFormDescModule} from "./dynamic-form-desc/dynamic-form-desc.module";

@NgModule({
    declarations: [
        DynamicFormPage
    ],
    imports: [
        DynamicFormDescModule,
        IonicPageModule.forChild(DynamicFormPage)
    ],
    providers: [
        DynamicService
    ]
})

export class DynamicFormModule{

}