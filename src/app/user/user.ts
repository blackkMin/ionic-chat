import {Component} from '@angular/core';
import {ActionSheetController, Events, IonicPage, NavController, NavParams, normalizeURL} from 'ionic-angular';
import {ChatService} from "../chat/chat.service";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user',
    templateUrl: 'user.html',
})
export class UserPage {

    userInfo: any;
    // 头像url 路径
    newUserIcon: string;
    oldUserIcon: string;


    constructor(public navCtrl: NavController,
                private events: Events,
                private chatService: ChatService,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.getInfo();
        this.events.subscribe('changeTeam', () => {
            this.getInfo();
        })

    }

    ionViewWillUnload() {
        this.events.unsubscribe('changeTeam');
    }

    async getInfo() {
        this.userInfo = await this.chatService.getMyInfo();
        console.log(this.userInfo);
    }

    public selectTeam() {
        this.navCtrl.push('ChangeTeamPage');
    }

    public myFile() {
        this.navCtrl.push('MyFilePage');
    }

    public selLanguage() {
        this.navCtrl.push('ChangeLanguagePage');
    }

    public myNews() {
        this.navCtrl.push('NewsNoticePage');
    }

    public bandAccount() {
        this.navCtrl.push('BindAccountPage');
    }

    public toSetting() {
        this.navCtrl.push('SettingPage');
    }


    public toCertification() {
        this.navCtrl.push('EnterpriseCertificationPage');
    }

    // 添加图片弹出提示框
    async addimg() {
        this.navCtrl.push('MyInfoPage');
    }


}
