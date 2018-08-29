/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
import {Injectable} from "@angular/core";
import {
    ToastController,
    LoadingController,
    Platform,
    Loading,
    AlertController,
    Keyboard as _Keyboard,
    normalizeURL
} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {Observable} from "rxjs";
import {Toast} from "@ionic-native/toast";
import {AppMinimize} from "@ionic-native/app-minimize";
import {Diagnostic} from "@ionic-native/diagnostic";
import {Geolocation} from "@ionic-native/geolocation";
import {ImagePicker} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from '@ionic-native/camera';
import {ImageResizer} from "@ionic-native/image-resizer";
import * as _ from 'lodash';
import {EnvironmentConfig} from "../common/config/config";

declare var LocationPlugin;
declare var AMapNavigation;
declare const Keyboard;
declare let qq: any;


@Injectable()
export class NativeService {
    private loading: Loading;

    constructor(private platform: Platform,
                private toastCtrl: ToastController,
                private alertCtrl: AlertController,
                private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                private keyboard: _Keyboard,
                private toast: Toast,
                private appMinimize: AppMinimize,
                private diagnostic: Diagnostic,
                private geolocation: Geolocation,
                private imagePicker: ImagePicker,
                private camera: Camera,
                private config: EnvironmentConfig,
                private imageResizer: ImageResizer,
                private loadingCtrl: LoadingController) {
    }

    log(info): void {
    }

    /**
     * 状态栏
     */
    statusBarStyle(statusColor: string): void {
        if (this.isMobile()) {
            this.statusBar.overlaysWebView(false);
            this.statusBar.styleLightContent();
            this.statusBar.backgroundColorByHexString(statusColor);//3261b3
        }
    }

    /**
     * 隐藏启动页面
     */
    splashScreenHide(): void {
        this.isMobile() && this.splashScreen.hide();
    }

    /**
     * 调用最小化app插件
     */
    minimize(): void {
        this.appMinimize.minimize()
    }

    /**
     * 是否真机环境
     */
    isMobile(): boolean {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    }

    /**
     * 是否android真机环境
     */
    isAndroid(): boolean {
        return this.isMobile() && this.platform.is('android');
    }

    /**
     * 是否ios真机环境
     */
    isIos(): boolean {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    }

    /**
     * 检测键盘是否弹出
     */
    isOpen(): boolean {
        if (this.isMobile()) {
            return Keyboard.isVisible;

        } else {
            return this.keyboard.isOpen();
        }
    }

    /**
     * 只有一个确定按钮的弹出框.
     * 如果已经打开则不再打开
     */
    alert = (() => {
        let isExist = false;
        return (title: string, subTitle: string = '', message: string = '', callBackFun = null): void => {
            if (!isExist) {
                isExist = true;
                this.alertCtrl.create({
                    title: title,
                    subTitle: subTitle,
                    message: message,
                    buttons: [{
                        text: '确定', handler: () => {
                            isExist = false;
                            callBackFun && callBackFun();
                        }
                    }],
                    enableBackdropDismiss: false
                }).present();
            }
        };
    })();

    /**
     * 统一调用此方法显示提示信息
     * @param message 信息内容
     * @param duration 显示时长
     */
    showToast(message: string = '操作完成', duration: number = 2000) {
        const mytoast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: 'middle',
            showCloseButton: false
        }).present();
        return mytoast;
    };

    /**
     * 统一调用此方法显示loading
     * @param content 显示的内容
     */
    showLoading(content: string = '') {
        if (!this.loading) {//如果loading已经存在则不再打开
            let loading = this.loadingCtrl.create({
                content: content,
                spinner: 'crescent'
            });
            loading.present();
            this.loading = loading;
            return loading;
        }
    };

    /**
     * 关闭loading
     */
    hideLoading(): void {
        setTimeout(() => {//延迟200毫秒可以避免嵌套请求loading重复打开和关闭
            this.loading && this.loading.dismiss();
            this.loading = null;
        }, 200);
    };

    /**
     * 获取地理位置
     */
    async getPosition(): Promise<any> {
        try {
            let coords;
            if (this.isMobile()) {
                const isLocationEnabled = await this.diagnostic.isLocationEnabled();
                if (isLocationEnabled) {
                    const geoposition = await this.geolocation.getCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 30000
                    });
                    coords = {
                        latitude: geoposition.coords.latitude,
                        longitude: geoposition.coords.longitude
                    }
                } else {
                    const alert = this.alertCtrl.create({
                        title: '请设置定位信息',
                        buttons: [
                            {
                                text: '前往',
                                handler: () => {
                                    this.diagnostic.switchToLocationSettings();
                                }
                            }
                        ]
                    });
                    alert.present();
                }
            }
            return coords;
        } catch (err) {
            console.error(err);
            this.showToast('获取位置信息失败');
        }
    }

    /**
     * 返回地理信息
     */
    private async setMyPosition() {
        const coords = await this.getPosition();
        // 标准坐标转腾讯地图坐标
        const center = new qq.maps.LatLng(coords.latitude, coords.longitude);
        // 转换坐标
        const latLng = await this.convertor(center);
        //获取我的位置信息
        const {detail} = await this.latLng(latLng);
        return detail;
    }

    /**
     * 标准经纬度转腾讯经纬度
     */
    convertor(latLng: any): Promise<any> {
        return new Promise((resolve, reject) => {
            qq.maps.convertor.translate(latLng, 1, (res: any[]) => {
                resolve(res[0]);
            });
        });
    }

    /**
     * 获取地理信息
     */
    latLng(coords: any): Promise<any> {
        return new Promise(((resolve, reject) => {
            const geocoder = new qq.maps.Geocoder();
            geocoder.getAddress(coords);
            geocoder.setComplete(res => {
                resolve(res);
            });
            geocoder.setError(err => {
                console.error(err, '获取地址失败');
                reject(err);
            });
        }));
    }

    /**
     * 打開相冊
     */
    async openGallery(): Promise<any> {
        try {
            let imgs = await this.imagePicker.getPictures({
                maximumImagesCount: 9,
                quality: 90
            });
            return imgs;
        } catch (err) {
            this.showToast(err);
        }

    }

    /**
     * type為0打開相冊，type為1照相
     */
    async seleImgType(type): Promise<any> {
        try {
            let imageData = await this.camera.getPicture({
                quality: 90,
                allowEdit: true,
                sourceType: type,
                targetWidth: 200,
                targetHeight: 200,
                correctOrientation: true,
            });
            // const idx = imageData.indexOf('?',0);
            // if(idx !== -1)imageData = imageData.substring(0,idx);
            return imageData;
        } catch (err) {
            this.showToast(err);
        }
    }

    async upload(theurl: string, files: { fileKey?: string, path: string; }[], body?: { [s: string]: any; }, httpType?: string): Promise<any> {
        try {
            const formData: FormData = new FormData();

            const url = this.config.apiEndPoint + theurl;


            if (!!files) {
                for (let i = 0; i < files.length; i++) {

                    // let url = files[i].path;
                    const theimg = await  this.imgWH(files[i].path);
                    const ratio = +(theimg.width / theimg.height).toFixed(4);
                    let imgwidth: number;
                    let imgheight: number;
                    // 横着的图片
                    if (ratio > 1) {
                        imgwidth = theimg.width > 1280 ? 1280 : theimg.width;
                        // 竖着的图片
                    } else if (ratio < 1) {
                        imgwidth = theimg.width > 960 ? 960 : theimg.width;
                        // 正方形图片
                    } else if (ratio === 1) {
                        imgwidth = theimg.width > 1000 ? 1000 : theimg.width;
                    }
                    imgheight = +(imgwidth / ratio).toFixed(0);

                    const myDate = await new Date();

                    const filename = await `${myDate.getFullYear()}${(myDate.getMonth() + 1)}${myDate.getDate()}${myDate.getHours()}${myDate.getMinutes()}${myDate.getMilliseconds()}${Math.floor(Math.random() * 100)}${i}.png`;
                    let url = await this.imageResizer.resize({
                        uri: files[i].path,
                        width: imgwidth,
                        height: imgheight,
                        quality: 90,
                        fileName: filename
                    });
                    const uploadFile = await this.urlToBlob(normalizeURL(url));
                    const index1 = url.lastIndexOf('/');
                    const index2 = url.lastIndexOf('.');
                    const name = url.slice(index1 + 1, index2 + 4);


                    formData.append(files[i].fileKey || 'file', uploadFile as Blob, name);

                }
            }


            if (body) {
                _.forEach(body, (val: any, key: string) => {
                    formData.append(key, val);
                });
            }

            const token = `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`;
            // 原生ajax请求
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(xhr.response);
                        }
                    }
                };
                xhr.open(httpType, url, true);
                // xhr.setRequestHeader(‘Authorization’, this.authToken);
                xhr.setRequestHeader('Authorization', token);
                xhr.send(formData);
            });

        } catch (err) {
            console.error(err)
        }


    }


    // 读取图片路径转换成DataURL
    imgWH(path: string): Promise<any> {

        return new Promise((resolve, reject) => {
            let img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height
                });
            };
            img.onerror = () => {
                reject()
            };
            img.src = path;
        });
    }

    public urlToBlob(url) {


        return new Promise((resolve, reject) => {

            const Img = new Image();

            Img.crossOrigin = 'anonymous';

            Img.onload = () => { //要先确保图片完整获取到，这是个异步事件
                let canvas = document.createElement("canvas"), //创建canvas元素
                    width = Img.width, //确保canvas的尺寸和图片一样
                    height = Img.height;
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
                const dataURL: string = canvas.toDataURL('image/png'); //转换图片为dataURL
                canvas = null;
                const result = this.dataURItoBlob(dataURL);
                resolve(result);
            };
            Img.src = url;

            Img.onerror = () => {
                reject('圖片加載錯誤')
            }

        });


    }

    // 另一中方法dataurl 转文件
    public dataURItoBlob(dataURI: string) {
        let byteString = atob(dataURI.split(',')[1]);
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
    }

    generateFileName(): string {
        let fileName: string = '';
        const myDate = new Date(); //实例一个时间对象；
        fileName += myDate.getFullYear().toString();   //获取系统的年；
        fileName += (myDate.getMonth() + 1).toString();   //获取系统月份，由于月份是从0开始计算，所以要加1
        fileName += myDate.getDate().toString(); // 获取系统日，
        fileName += myDate.getHours().toString(); //获取系统时，
        fileName += myDate.getMinutes().toString(); //分
        fileName += myDate.getSeconds().toString(); //秒
        return fileName;
    }

    getPopCalback(params) {
        return new Promise((resolve, reject) => {
            resolve(params);
        })
    }


}
