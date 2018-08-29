import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-input-transfer',
    templateUrl: 'input-transfer.html',
})
export class InputTransferPage {
    data: any;

    constructor(public nav: NavController,
                public navParams: NavParams) {
        this.data = this.navParams.get('data');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InputTransferPage');
    }

    async onSave(){
        const callback = this.navParams.get("callback")

        const params = 123;
        const res = await callback(params);
        this.nav.pop();
    }

}
