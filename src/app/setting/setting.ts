import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, App} from 'ionic-angular';
import {LoginPage} from "../auth/login/login";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public app: App,

              ) {
  }

  ionViewDidLoad() {
  }



  public contactUs(){
    this.navCtrl.push('ContactUsPage')

  }
  public modifyPwd(){
    this.navCtrl.push('ModifyPwdPage')
  }

  public async close() {

    const alert = this.alertCtrl.create({
      title: '您确定要退出吗？',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确认',
          handler: () => {
            try{
              // this.auth.logout();
              // this.events.publish('updata:orderNum')
              this.app.getRootNav().setRoot('LoginPage');
            }catch(err){
              console.error(err);
            }
          }
        }
      ]
    });
    alert.present();
  }




}
