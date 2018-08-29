import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, App} from 'ionic-angular';
import {NativeService} from "../../../providers/native.service";
import {ChatService} from "../../chat/chat.service";
// import {AuthServiceProvider} from "../../providers/auth/auth";
// import {ToastService} from "../../core/common/toast.service";
// import {LoadingService} from "../../core/common/loading.service";


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    //驗證碼倒計時
    count: number;

    // 是否同意协议
    isagree: boolean = true;

    isPassword: boolean = true;
    isPhone: boolean = true;
    // 是否显示选择区号
    isShowArea:boolean = false;
    areaCodes:any = ['+852','+853','+86','+886'];
    // 已选中的区号
    selectCode:string = this.areaCodes[0];
    placeholderText:string = '請輸入8位手機號碼';
    maxlength:number = 8;

    formInfo: any = {
        phone: null,
        code: null,
        password: null,
        repeatPassword: null,
    }


    constructor(private nav: NavController,
                private app: App,
                private nativeService: NativeService,
                private chatService: ChatService,
                // private auth: Auth,
                // private teamService: TeamService,
                private navParams: NavParams) {
    }
    public goBack(){
        this.nav.pop();
    }




    public goprotocol(){
        this.nav.push('RegisterProtocolPage');
    }

    public isAgreement(){
        this.isagree=!this.isagree
    }




    public async  getCode(){
        // const nophone: boolean = /\D/ig
        //   .test(this.formInfo.phone);
        // if(nophone) return;
        //
        // try{
        //   if(this.count>0) return;
        //   this.countdown();
        //   const res = await this.auth.getCode({ phone:this.formInfo.phone ,areaCode:this.selectCode}).toPromise();
        //   // this.formInfo.code=res.result;
        // }catch (err){
        //   this.count=0;
        // }
    }

    // 开始选择区号
    public alertArea() {
        setTimeout(()=> {
            this.isShowArea = true;
        },100)
    }

    // 选中一区号
    selectAreaCode(item) {
        this.selectCode = item;
        this.isShowArea = false;
        switch(item){
            case '+852':
                this.maxlength = 8;
                this.placeholderText = '請輸入8位手機號碼';
                return;
            case '+853':
                this.maxlength = 8;
                this.placeholderText = '請輸入8位手機號碼';
                return;
            case '+86':
                this.maxlength = 11;
                this.placeholderText = '請輸入11位手機號碼';
                return;
            case '+886':
                this.maxlength = 10;
                this.placeholderText = '請輸入10位手機號碼';
                return;
        }

    }


    // 注册
    public async register() {
        // 验证密码2此输入的书否一致以及是否有空格
        console.log(this.formInfo);

        if(!this.verification()) return;

        const loading =  this.nativeService.showLoading();
        this.nativeService.showLoading();
        try {
            // const res:any = await this.auth.signUp({phone: this.formInfo.phone, password: this.formInfo.newpassword, areaCode: this.selectCode,code:this.formInfo.code}).toPromise();
            // let resInvite:any;
            // if (!!res && res.status) {
            //   await this.auth.login({phone:this.formInfo.phone, password: this.formInfo.newpassword}).toPromise();
            //   resInvite = await this.teamService.teamInviteInfo().toPromise();
            // }
            //
            // loading.onDidDismiss(() => {
            //   if(resInvite.status && resInvite.result.length>0){
            //     this.teamService.invitatedSetItems(resInvite.result[0]);
            //     this.acceptTeamInvite(resInvite.result);
            //   }else{
            //     this.app.getRootNavs()[0].setRoot('CreateTeamPage');
            //   }
            //
            // });

            const res = await this.chatService.getRegister(this.formInfo.phone,this.formInfo.password);
            this.nav.pop();
            console.log(res);


        } catch (err) {
            console.error(err);
        } finally {
            this.nativeService.hideLoading()
        }
    }
    // 接受团队邀请
    private async acceptTeamInvite(inviteInfo:any){
        // const res:any = await this.teamService.acceptTeam({employeeId:inviteInfo[0].id,teamId:inviteInfo[0].teamId}).toPromise();
        // if(res.status) this.app.getRootNavs()[0].setRoot('TabsPage');
    }

    // 驗證
    public  verification(){
        const okNewPassword: boolean = /^[^\s]{6,12}$/ig
            .test(this.formInfo.password);
        const okRealPpassword: boolean = /^[^\s]{6,12}$/ig
            .test(this.formInfo.repeatPassword);
        if(this.formInfo.password!=this.formInfo.repeatPassword){
            this.nativeService.showToast('密碼不一致');
            return false;
        }else if(!okNewPassword && !okRealPpassword && !!this.formInfo.password &&  this.formInfo.repeatPassword && this.formInfo.password!='請輸入6-12位數字或字母密碼' && this.formInfo.repeatPassword!='請確認密碼'){
            this.nativeService.showToast('密碼格式錯誤');
            return false;
        }else{
            return true;
        }

    }



//
//   // 弹出用户注册协议
//
//   public registerProtocol() {
//     this.nav.push('RegisterProtocolPage');
//     // this.modalCtrl.create(Profile, { userId: 8675309 });
//
//   }
//
//
// // 測試密碼格式
//   public testPassword() {
//     const okpassword: boolean = /^[^\s]{6,12}$/ig.test(this.formInfo.password);
//     if(!okpassword && (!!this.formInfo.password) && this.formInfo.password != '設置密碼(6-12位，不含空格)') {
//       this.isPassword = false;
//     } else {
//       this.isPassword = true;
//     }
//   }
//
//   // 點擊錯誤提示后取消紅色提示
//   public async reInput() {
//     this.isPassword = true;
//     this.formInfo.password = '';
//   }
//
//   // 點擊錯誤提示后取消紅色提示
//   public async rePhoneInput() {
//     this.isPhone = true;
//     this.formInfo.phone = '';
//   }
//
//

    // 倒计时
    countdown() {
        if (!this.count) {
            this.count = 60;
            if (this.count > 0) {
                let timer = setInterval(() => {
                    this.count--;
                    if (this.count < 1) {
                        clearInterval(timer);
                        timer = null;
                    }
                }, 1000)
            }
        }
    }


}
