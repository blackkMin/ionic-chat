import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, Config} from 'ionic-angular';
import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CoreModule} from "../common/core.module";
import {NativeService} from "../providers/native.service";
import { IonAlphaScrollModule } from 'ionic4-alpha-scroll';
import {ModalFromBottomEnter, ModalFromBottomLeave} from "./modal-transitions";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        IonicModule.forRoot(MyApp, {
            mode: 'ios',
            tabsHideOnSubPages: true,
            swipeBackEnabled: true,
            backButtonText: ''
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        IonAlphaScrollModule,
        SplashScreen,
        NativeService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
    constructor(public config: Config) {
        this.setCustomTransitions();
    }

    private setCustomTransitions() {
        this.config.setTransition('modal-from-bottom-enter', ModalFromBottomEnter);
        this.config.setTransition('modal-from-bottom-leave', ModalFromBottomLeave);
    }
}
