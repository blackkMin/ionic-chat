import {Component} from "@angular/core";
import {IonicPage, NavParams, ViewController} from "ionic-angular";

@IonicPage()
@Component({
    selector: 'page-chat-list-modal',
    templateUrl: './chat-list-modal.html'
})

export class ChatListModal{
    conversation: any;

    constructor(public navParams: NavParams,
                public viewCtrl: ViewController){
        this.conversation = this.navParams.get('data');
    }


}