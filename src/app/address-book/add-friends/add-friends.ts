import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatService} from "../../chat/chat.service";
import * as _ from 'lodash';

@IonicPage()
@Component({
    selector: 'page-add-friends',
    templateUrl: 'add-friends.html',
})
export class AddFriendsPage {

    num: number = 13249305938;
    type: string = 'single';

    constructor(public nav: NavController,
                public navParams: NavParams,
                private chatService: ChatService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddFriendsPage');
    }

    segmentChanged(e) {
        console.log(e);
    }

    add(){

    }

    async search(){
        const res = this.type === 'single' ? await this.getUserInfo() : await this.getGroupInfo();
        console.log(res,'resresres');
        if(!_.isNil(res))this.nav.push('ChatDetailPage',{data: res});
    }

    async getUserInfo(){
        try{
            const data = await this.chatService.getUserInfo(this.num);
            return data;
        }catch (err) {
            console.log(err);
        }
    }

    async getGroupInfo(){
        try{
            const data = await this.chatService.getGroupInfo(this.num);
            return data;
        }catch (err) {
            console.log(err);
        }
    }

}
