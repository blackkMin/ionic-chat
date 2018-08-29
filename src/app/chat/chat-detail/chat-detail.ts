import {Component} from "@angular/core";
import {
    AlertController,
    Events,
    IonicPage,
    ModalController,
    NavController,
    NavParams,
    ViewController
} from "ionic-angular";
import {JMessagePlugin} from "@jiguang-ionic/jmessage";
import * as _ from 'lodash';
import {NativeService} from "../../../providers/native.service";
import {ChatService} from "../chat.service";

@IonicPage()
@Component({
    selector: 'page-chat-detail',
    templateUrl: './chat-detail.html'
})

export class ChatDetailPage {

    info: any;

    members: any[] = [];
    groupInfo: any;

    constructor(public nav: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                public nativeService: NativeService,
                private events: Events,
                public modalCtrl: ModalController,
                public viewCtrl: ViewController,
                private chatService: ChatService,
                private jMessage: JMessagePlugin) {
        this.info = this.navParams.get('data');
        console.log(this.info, '~~~~~info');
    }

    ionViewDidLoad() {
        if (this.info.type === 'group') {
            this.getGroupInfo();
            this.getGroupMember();
        }
    }

    ionViewWillLeave() {
        if (this.nav.getActive().id === 'ChatDetailPage') this.events.publish('chat: refresh', this.groupInfo.name)
    }

    async getGroupInfo() {
        try {
            this.groupInfo = await this.jMessage.getGroupInfo({id: this.info.groupId});
        } catch (err) {
            console.log(err);
        }
    }

    async getGroupMember() {
        try {
            this.members = await this.jMessage.getGroupMembers({id: this.info.groupId});
        } catch (err) {
            console.log(err);
        }
    }

    goIndexList() {

        this.nav.push('IndexEmployeePage', {members: this.members, groupInfo: this.groupInfo});
    }

    showPrompt() {
        const prompt = this.alertCtrl.create({
            message: '更改群名称',
            inputs: [
                {
                    name: 'title',
                    placeholder: 'Title',
                    value: this.groupInfo.name
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: data => {
                    }
                },
                {
                    text: '确定',
                    handler: data => {
                        if (_.isEmpty(data.title)) return this.nativeService.showToast('不能为空');
                        this.updateGroupInfo(data.title);
                    }
                }
            ]
        });
        prompt.present();
    }

    async exitGroup() {

        const confirm = this.alertCtrl.create({
            message: '确定退出该群组吗',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                    }
                },
                {
                    text: '确定',
                    handler: async () => {
                        try {
                            await this.jMessage.exitGroup({id: this.info.groupId});
                            let params = {
                                type: 'group',
                                groupId: this.info.groupId
                            };
                            await this.deleteConversation(params);
                            this.nav.remove(this.viewCtrl.index - 1, 1);
                            this.nav.pop();
                        } catch (err) {
                            console.log(err);
                        }
                    }
                }
            ]
        });
        confirm.present();

    }

    async updateGroupInfo(groupName) {
        try {
            await this.jMessage.updateGroupInfo({id: this.info.groupId, newName: groupName});
            this.groupInfo.name = groupName;
        } catch (err) {
            console.log(err);
        }
    }

    addimg() {

    }

    async deleteConversation(params) {
        try {
            const res = await this.jMessage.deleteConversation(params);
            return res;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    setNoteName() {
        let modal = this.modalCtrl.create('RemarkPage', {remark: this.info.noteName}, {
            enterAnimation: 'modal-from-bottom-enter',
            leaveAnimation: 'modal-from-bottom-leave',
            cssClass: 'reject-remark-modal'
        });
        modal.present();

        modal.onDidDismiss(async (data) => {
            if (!_.isNil(data)) await this.chatService.updateFriendNoteName(this.info.username, data);
        })
    }

    async addAddressBook() {
        // callback...
        // const myCallbackFunction = function (_params) {
        //     return new Promise((resolve, reject) => {
        //         console.log(_params);
        //         resolve();
        //     });
        // }

        // push page...
        this.nav.push('InputTransferPage', {
            callback: this.getPopCalback
        });

    }

    getPopCalback(params) {
        return new Promise((resolve, reject) => {
            console.log(params,'first');
            resolve(params);
            console.log(params,'last');
        })
    }


}