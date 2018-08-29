import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-remark',
  templateUrl: 'remark.html',
})
export class RemarkPage {

    remark: string = '';

    constructor(public navParams: NavParams,
                public viewCtrl: ViewController) {

    }

    ngOnInit() {
        this.remark = this.navParams.get('remark');
    }

    returnBack() {
        this.viewCtrl.dismiss(this.remark);
    }
}
