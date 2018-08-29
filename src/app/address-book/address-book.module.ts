import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddressBookPage} from './address-book';
import {IndexListModule} from "ionic3-index-list";
import {SharedModule} from "../../common/shared/shared.module";
import { IonAlphaScrollModule } from 'ionic4-alpha-scroll';

@NgModule({
    declarations: [
        AddressBookPage,
    ],
    imports: [
        IonAlphaScrollModule,
        IndexListModule,
        SharedModule,
        IonicPageModule.forChild(AddressBookPage),
    ],
    providers: [
    ]
})
export class AddressBookPageModule {
}
