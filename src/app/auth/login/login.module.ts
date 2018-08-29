import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {SharedModule} from "../../../common/shared/shared.module";

@NgModule({
    declarations: [
        LoginPage,
    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(LoginPage),
    ],
    providers: [
    ]

})
export class LoginPageModule {}
