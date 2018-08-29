import { Component } from '@angular/core';
import {ActionSheetController, Events, IonicPage, NavController, NavParams, normalizeURL, Platform} from 'ionic-angular';
import {NativeService} from "../../../providers/native.service";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Crop} from "@ionic-native/crop";
import {ChatService} from "../../chat/chat.service";
import {AndroidPermissions} from "@ionic-native/android-permissions";

@IonicPage()
@Component({
    selector: 'page-my-info',
    templateUrl: './myInfo.html'
})
export class MyInfoPage {

    formInfo:any={
        lastName:'',
        firstName:'',
        phone:'',
        gender:'M',
    };

    userInfo:any;
    // 头像url 路径
    newUserIcon:string;
    oldUserIcon:string;

    constructor(public navCtrl: NavController,
                private camera: Camera,
                private nativeService: NativeService,
                private events: Events,
                private crop: Crop,
                private actionSheetCtrl:ActionSheetController,
                private platform: Platform,
                private androidPermissions: AndroidPermissions,
                private chatService: ChatService,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {

        this.getInfo();

        // 请求权限
        if (this.platform.is('android')) {
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
        }
    }

    async getInfo(){
        this.userInfo = await this.chatService.getMyInfo();
        console.log(this.userInfo);
    }


    // 添加图片弹出提示框
    async addimg() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '图片来源',
            buttons: [
                {
                    text: '相册',
                    icon: 'images',
                    handler: () => {
                        // this.openGallery();
                        this.openCamera(2);
                    }
                },
                {
                    text: '相机',
                    icon: 'camera',
                    handler: () => {
                        this.openCamera(1);
                    }
                },
                {
                    text: '取消',
                    role: 'cancel'
                }
            ]
        });

        actionSheet.present();
    }
    //打開相機
    async openCamera(sourcetype:number): Promise<any> {
        const imageData = await this.camera.getPicture({
            quality: 90,
            sourceType: sourcetype,
            allowEdit:false,
            correctOrientation: true,
            cameraDirection:1
        });
        console.log(imageData,'=====00');

        const newimg = normalizeURL(imageData);
        // 裁剪图片
        console.log(newimg,'=====01');
        const imgWH:any = await this.nativeService.imgWH(newimg);
        console.log('=====02');

        if(imgWH.width<200 || imgWH.height<200){
            this.nativeService.showToast('编辑失败，头像必须是最小宽度大于200px且是正方形的图片',2500);
            return;
        }



        try{
            const newImage =  await this.crop.crop(imageData, {quality: 90, targetWidth: 200, targetHeight: 200});
            console.log(newImage,1);
            this.chatService.updateMyAvatar(normalizeURL(newImage));
        }catch (err) {
            console.log(err,3);
        }

    }
    //上传头像
    private async upload(){
        try {
            const userId=localStorage.getItem('user_id');
            const res:any = await this.nativeService.upload(`t/users/${userId}/avatar`,[{fileKey:'file',path:this.newUserIcon}],{teamId: localStorage.getItem('team')},'POST');
            if(res && !!res.status){
                const userInfo = JSON.parse(localStorage.getItem('OAUserInfo'));
                this.newUserIcon = res.result.avatarUrl;
                userInfo.avatarUrl = res.result.avatarUrl;
                localStorage.setItem('OAUserInfo',userInfo);
                this.chatService.updateMyAvatar(res.result.avatarUrl);
            }
            return res;

        } catch (err) {
            console.error(err);
        }
    }

    public async save(){

        const loading = this.nativeService.showLoading();
        try{
            let uploadres:any;
            if(this.newUserIcon && (this.newUserIcon != this.oldUserIcon)){
                uploadres = await this.upload();
                if(!uploadres || !uploadres.status){
                    // return this.nativeService.showToast(this.translateService.instant('global.alert.avatar_err'));
                    return
                }
            }

            // const res2=await this.authService.updataUser(this.formInfo).toPromise();
            // localStorage.setItem('OAUserInfo',JSON.stringify(res2.result));
            loading.onDidDismiss(async () => {
                // if(res2.status){
                //     this.events.publish('changeTeam');
                //     this.navCtrl.pop();
                //     this.updateIMInfo(res2.result);
                // }
            });


        }catch(err){
            console.error(err);
            this.nativeService.showToast('编辑失败，头像必须是最小宽度大于200px且是正方形的图片');
        }finally {
            this.nativeService.hideLoading();
        }
    }

    updateIMInfo(data){
        this.chatService.updateMyInfo({nickname: data.firstName + data.lastName});
    }

}
