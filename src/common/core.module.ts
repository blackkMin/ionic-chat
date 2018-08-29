import {NgModule, SkipSelf, Optional, ElementRef} from '@angular/core';
import {StatusBar} from "@ionic-native/status-bar";
import {AppMinimize} from "@ionic-native/app-minimize";
// import {Toast} from "ionic-angular";
import {Diagnostic} from "@ionic-native/diagnostic";
import {ImagePicker} from "@ionic-native/image-picker";
import {ImageResizer} from "@ionic-native/image-resizer";
import {EnvironmentConfig} from "./config/config";
import {ChatService} from "../app/chat/chat.service";
import {Geolocation} from '@ionic-native/geolocation';
import { File } from '@ionic-native/file';
import {Toast} from "@ionic-native/toast";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {JMessagePlugin} from "@jiguang-ionic/jmessage";
import {Crop} from "@ionic-native/crop";
import {AndroidPermissions} from "@ionic-native/android-permissions";
//native插件
const NATIVE = [
    AppMinimize,
    JMessagePlugin,
    Toast,
    Diagnostic,
    // Hotspot,
    Geolocation,
    // UniqueDeviceID,
    ImagePicker,
    Camera,
    ImageResizer,
    File,
    Crop,
    // Base64ToGallery,
    AndroidPermissions,
    // ScreenOrientation,
    // MobileAccessibility,
    StatusBar,
    // Globalization


    // StatusBar,
    // SplashScreen,
    // // IsDebug,
    // Camera,
    // ImageResizer,
    // // QRScanner,
    // File,
    // Camera,
    // Stripe,
    // Base64ToGallery,
    // AndroidPermissions,
    // BrowserTab,
    // InAppBrowser,
    // ScreenOrientation,
    // Market,
    // AppVersion,
    // Badge,
    // Network,
    // MobileAccessibility
];


// 常用的
const COMMON = [
    // HttpService,
    EnvironmentConfig,
    // AuthConfig,
    // ToolService,
    // BackService,
    // KeyboardService,
    // PickerService,
    // TeamService,
    // GlobalSettingObservableService,
    // SelfObservableService,
    // SelchatpeopleService,
    ChatService,
    // JPush,
    // SearchService,
    // NoticesService
];


// 核心的服務
@NgModule({
    providers: [
        ...NATIVE,
        ...COMMON
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() module: CoreModule) {
        if (module) {
            throw new Error(`CoreModule 已经在 AppModule 导入`);
        }
    }
}
