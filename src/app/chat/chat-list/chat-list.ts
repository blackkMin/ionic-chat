import {Component} from "@angular/core";
import {Events, IonicPage, ModalController, NavController, Platform} from "ionic-angular";
import {Chat} from "../chat.class";
import {JMessagePlugin} from '@jiguang-ionic/jmessage';
import {NativeService} from "../../../providers/native.service";
import * as _ from 'lodash';

@IonicPage()
@Component({
    selector: 'page-chat-list',
    templateUrl: './chat-list.html'
})

export class ChatListPage {
    receiveMessageSub: any;

    conversations: Chat[] = [];
    // 未读站内通知数量
    notReadNum:number;

    invitations: any[] = [];

    constructor(platform: Platform,
                public nativeService: NativeService,
                private jMessage: JMessagePlugin,
                public nav: NavController,
                private events: Events,
                public modalCtrl: ModalController
    ) {
        platform.ready().then(() => {

        });
    }

    ngOnInit() {
    }

    ionViewWillEnter(){
        this.getConversations();
        this.reloadTeamInvitations();
    }

    ionViewWillLeave(){
    }

    async getMyInfo() {
        try {
            const info = await this.jMessage.getMyInfo();
        } catch (e) {
            console.log(e);
        }
    }

    async reloadTeamInvitations(): Promise<any> {
        try {
            // const result = await this.teamService.teamInviteInfo().toPromise();
            // this.invitations = result.result;
        } catch (err) {
            console.error(err);
        }
    }

    async getConversations() {
        try {
            const conversations = await this.jMessage.getConversations();
            this.conversations = conversations;
        } catch (e) {
            console.log(e);
        }
    }

    goConversation(con) {
        if(con.conversationType === 'single')this.nav.push('ChatFormPage', {username: con.target.username});
        if(con.conversationType === 'group')this.nav.push('ChatFormPage', {groupId: con.target.id});
    }

    //下拉刷新
    async doRefresh(refresher): Promise<any> {
        await this.getConversations();
        await this.reloadTeamInvitations();
        refresher.complete();
    }

    toNotices(){
        this.nav.push('NoticesPage');
    }

    onDeleteConversation(e){
        console.log(e);
        let modal = this.modalCtrl.create('ChatListModal', {data: e},{
            enterAnimation: 'modal-from-right-enter',
            leaveAnimation: 'modal-from-right-leave',
            cssClass: 'reject-remark-modal'
        })
        modal.present();
        modal.onDidDismiss(async (data) => {
           if(_.isNil(data))return;
           try{
               let params;
               params = {type: data.conversationType};
               if(data.conversationType === 'single')_.assign(params,{username: data.target.username});
               if(data.conversationType === 'group')_.assign(params,{groupId: data.target.id});

               const res = await this.deleteConversation(params);

               if(res)this.getConversations();
           }catch (err) {
               console.log(err,92);
           }
        })
    }

    async deleteConversation(params){
        try{
            const res = await this.jMessage.deleteConversation(params);
            return res;
        }catch (err) {
            console.log(err);
            return false;
        }
    }

    goTeamInvitation(invitations){
        this.nav.push('TeamInvitationPage',{invitations: invitations});
    }
}
