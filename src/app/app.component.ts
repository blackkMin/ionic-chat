import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ChatService} from "./chat/chat.service";
import {TabsPage} from "./tabs/tabs";
import {NativeService} from "../providers/native.service";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = 'LoginPage';

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                private chatService: ChatService,
                private nativeService: NativeService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            this.getInfo();
        });
    }

    async getInfo() {
        this.nativeService.showLoading();
        const res = await this.chatService.getMyInfo();
        this.nativeService.hideLoading();
        this.rootPage = res ? 'TabsPage' : 'LoginPage';
    }
}
