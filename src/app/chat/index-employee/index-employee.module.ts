import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {IndexListModule} from "ionic3-index-list";
import {IndexEmployeePage} from "./index-employee";

@NgModule({
    declarations: [
        IndexEmployeePage
    ],
    imports: [
        IndexListModule,
        IonicPageModule.forChild(IndexEmployeePage)
    ]
})

export class IndexEmployeeModule {

}