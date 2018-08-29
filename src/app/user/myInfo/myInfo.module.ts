import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PipeModule} from "../../../common/pipe/index";
import {MyInfoPage} from "./myInfo";

@NgModule({
    declarations: [
        MyInfoPage,
    ],
    imports: [
        PipeModule,
        IonicPageModule.forChild(MyInfoPage),
    ],
})
export class MyInfoPageModule {}
