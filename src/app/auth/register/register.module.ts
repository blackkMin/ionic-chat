import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import {SharedModule} from "../../../common/shared/shared.module";

@NgModule({
    declarations: [
        RegisterPage,
    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(RegisterPage),
    ],
})
export class RegisterPageModule {}
