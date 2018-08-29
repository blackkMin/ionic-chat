import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, App, Events, Content} from 'ionic-angular';
import * as _ from 'lodash';
import {NativeService} from "../../../providers/native.service";
import {TabsPage} from "../../tabs/tabs";
import {RegisterPage} from "../register/register";
import {ChatService} from "../../chat/chat.service";
// import {MessageService} from "../../providers/message/message";
// import {LoadingService} from "../../core/common/loading.service";
// import {AuthServiceProvider} from "../../providers/auth/auth";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    @ViewChild('focusinput') focusInput:ElementRef;
    @ViewChild(Content) content: Content;

    myAccount: string = '13680713055';
    myPassword: string = '123456';

    // 账号，密码验证是否正确
    isAccount: boolean = true;
    isPassword: boolean = true;

    constructor(public navCtrl: NavController,
                public app: App,
                public events: Events,
                public navParams: NavParams,
                private nativeService: NativeService,
                private chatService: ChatService
    ) {
    }
    ionViewDidEnter(){
        console.log(this.focusInput,'==========');
    }

    public goBack(){
        this.navCtrl.pop();
    }

    // // 忘记密码BTN
    public forgetPassword() {
        this.navCtrl.push('ForgetPwdPage');
    }

    // 登录
    public async login() {
        if(!this.verification()) return;
        const loading = this.nativeService.showLoading();
        try {
            // 判断是电话还是邮箱
            const okphone: boolean = /^\d{8,11}$/ig.test(this.myAccount);
            let params:any = {};
            if(okphone){
                params={phone:this.myAccount,password:this.myPassword,mode:'app'};
            }else{
                params={email:this.myAccount,password:this.myPassword,mode:'app'};
            }

            const res = await this.chatService.getLogin(this.myAccount,this.myPassword);
            console.log(res,'~~~');
            if(res)this.navCtrl.push('TabsPage');

        } catch (err) {
            console.error(err);
        } finally {
            this.nativeService.hideLoading()
        }

    }

    // 接受团队邀请并跳tab
    private async acceptTeamInvite(inviteInfo:any){
        // const res:any = await this.teamService.acceptTeam({employeeId:inviteInfo.id,teamId:inviteInfo.teamId}).toPromise();
        // if(res && res.status) this.app.getRootNavs()[0].setRoot('TabsPage');
    }
    // 驗證
    public  verification(){
        const okphone: boolean = /^\d{8,11}$/ig
            .test(this.myAccount);
        const okemail: boolean = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z]|[-a-z0-9_]+)|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/ig
            .test(this.myAccount);
        // const passwordhasnum: boolean = /[0-9]+/
        //     .test(this.myPassword);
        // const passwordhaslower: boolean = /[a-z]+/
        //     .test(this.myPassword);
        // const passwordhascapital: boolean = /[A-Z]+/
        //     .test(this.myPassword);
        const okpassword: boolean = /^[^\s]{6,30}$/ig.test(this.myPassword);

        if (!okphone && !okemail && (!!this.myAccount) ) {
            this.nativeService.showToast('账号格式错误');
            return false;
            // } else if((!passwordhasnum || !passwordhaslower || !passwordhascapital) && (!!this.myPassword)) {
        } else if(!okpassword && (!!this.myPassword)) {
            this.nativeService.showToast('密码必须包含大写英文字母、小写英文字母、数字');
            return false;
        }else{
            return true;
        }



    }

    // 获取焦点页面向上滚动
    public goscroll(){
        this.content.scrollTo(0, 200);
    }

    goRegister(){
        this.navCtrl.push('RegisterPage');
    }

}
