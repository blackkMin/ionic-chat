import {EventEmitter, Injectable} from '@angular/core';
import {App, Events, normalizeURL, Platform} from 'ionic-angular';
import {map} from 'rxjs/operators/map';
import {Observable} from "rxjs/Observable";
import {JMessagePlugin, JMUserInfo} from '@jiguang-ionic/jmessage';
import * as _ from 'lodash';
import {NativeService} from "../../providers/native.service";
import {File} from '@ionic-native/file';
import {IResponse} from "../../common/interceptor/default.interceptor";

export const chatAppKey: string = '3e605916717a925d17bca58f';

export class ChatMessage {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    status: string;
}

export class UserInfo {
    type?: 'user';
    username?: string;           // 用户名
    appKey?: string;             // 用户所属应用的 appKey，可与 username 共同作为用户的唯一标识
    nickname?: string;           // 昵称
    gender?: string;             // 'male' / 'female' / 'unknown'
    avatarThumbPath?: string;    // 头像的缩略图地址
    birthday?: number;           // 日期的毫秒数
    region?: string;             // 地区
    signature?: string;          // 个性签名
    address?: string;            // 具体地址
    noteName?: string;           // 备注名
    noteText?: string;           // 备注信息
    isNoDisturb?: boolean;       // 是否免打扰
    isInBlackList?: boolean;     // 是否在黑名单中
    isFriend?: boolean;          // 是否为好友
    extras?: object;             // 自定义键值对
}

@Injectable()
export class ChatService {

    addReceiveMessageListener = new EventEmitter<any>();
    addLoginStateChangedListener = new EventEmitter<any>();
    addClickMessageNotificationListener = new EventEmitter<any>();

    constructor(private jMessage: JMessagePlugin,
                private platform: Platform,
                private nativeService: NativeService,
                private app: App,
                private file: File,
                private events: Events) {
        this.platform.ready().then(() => {
            if (this.nativeService.isMobile()) {
                this.jMessageInit();
            }
        });
    }


    /**
     * 极光IM初始化
     * @param options
     */
    async jMessageInit() {
        console.log('jMessageInit', 111);
        // 初始化插件
        this.jMessage.init({isOpenMessageRoaming: true})
        //用户注册。

        //obj对应的参数详情请看文档
        //https://github.com/jpush/jmessage-phonegap-plugin/wiki/APIs

        this.jMessage.addReceiveMessageListener((message: any) => {
            this.addReceiveMessageListener.emit(message);
        });

        this.jMessage.addLoginStateChangedListener((message: any) => {
            this.addLoginStateChangedListener.emit(message);
        })

        this.jMessage.addClickMessageNotificationListener((message: any) => {
            this.addClickMessageNotificationListener.emit(message);
        })

        // this.jMessage.logout().then(
        //     //代码
        // )
        //获取用户信息
        this.jMessage.getMyInfo().then()
        // 此处省略很多方法... 详情对照https://github.com/jpush/jmessage-phonegap-plugin/wiki/APIs 方法名
    }

    /**
     * 极光IM login
     * @param options
     */
    async getLogin(username, password) {
        //用户登录
        try {
            const res = await this.jMessage.login({username: username, password: password});
            return res;
        } catch (err) {
            this.nativeService.showToast(err.description);
            return false;
        }
    }

    /**
     * 极光IM register
     * @param options
     */
    async getRegister(username, password) {
        //用户登录
        try {
            const res = await this.jMessage.register(_.assign({
                username: username,
                password: password
            }, {nickname: username}));
            return res;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    /**
     * 极光IM logout
     * @param options
     */
    async getLogout() {
        //用户登录
        try {
            const rr = await this.jMessage.logout();
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * 极光IM createGroup
     * @param options
     */
    async createGroup(employees, groupName) {
        //创建group


        try {
            const res = await this.jMessage.createGroup({name: groupName, desc: ''});
            this.addGroupMembers(res, employees);
        } catch (err) {
            this.nativeService.hideLoading();
            console.log(err);
        }
    }

    /**
     * 极光IM addGroupMembers
     * @param options
     */
    async addGroupMembers(id, employees) {
        console.log(employees, '~~~~165');
        let usernameArray = [];
        usernameArray = _.map(employees, (item) => {
            return 'yoov_' + item.userId;
        })
        try {
            const res = await this.jMessage.addGroupMembers({id: id, usernameArray: usernameArray, appKey: chatAppKey});
            this.nativeService.hideLoading();
            this.app.getActiveNavs()[0].push('ChatFormPage', {groupId: id});
        } catch (err) {
            console.log(err);
            if (err.code === 898002) {
                const userBak1 = err.description.substr(1);
                const userBak2 = userBak1.substr(0, userBak1.length - 1).replace(/[ ]/g, "");

                const reg = new RegExp('yoov_', "g")
                const str = userBak2.replace(reg, '');
                console.log(str);
                try {
                    // const res = await this.getUserName({userIds: str}).toPromise();
                    // console.log(res.result);
                    // await res.result.map(async (item,n)=>{
                    //    try{
                    //        // await this.getRegister({username: `yoov_${item.id}`,password: `yoov_${item.id}`},item);
                    //        if(n === res.result.length - 1)this.addGroupMembers(id,employees);
                    //    } catch (err) {
                    //        return this.nativeService.hideLoading();
                    //    }
                    //    console.log(11111111111);
                    // })
                } catch (err) {
                    console.log(err);
                    return this.nativeService.hideLoading();
                }
            } else {
                this.nativeService.hideLoading();
            }
        }
    }


    // mockNewMsg(msg) {
    //     const mockMsg: ChatMessage = {
    //         messageId: Date.now().toString(),
    //         userId: '210000198410281948',
    //         userName: 'Hancock',
    //         userAvatar: 'assets/img/avatars/default-M.png',
    //         toUserId: '140000198202211138',
    //         time: Date.now(),
    //         message: msg.message,
    //         status: 'success'
    //     };
    //
    //     setTimeout(() => {
    //         // this.events.publish('chat:received', mockMsg, Date.now())
    //     }, Math.random() * 1800)
    // }

    async getMsgList(conversation: any, filter: any): Promise<any[]> {
        try {
            let data;
            if (conversation.conversationType === 'single') data = {username: conversation.target.username};
            if (conversation.conversationType === 'group') data = {groupId: conversation.target.id};
            data = _.assign(data, {
                type: conversation.conversationType,
                from: filter.page < 2 ? filter.page - 1 : (filter.page - 1) * filter.limit,
                limit: 15
            })
            const msg = await this.jMessage.getHistoryMessages(data);
            return _.orderBy(msg, ['createTime'], ['asc']);
        } catch (e) {
            console.log(e);
        }
    }

    async sendMsg(conversation: any, msg: any): Promise<any> {
        try {
            let data;
            if (conversation.conversationType === 'single') data = {username: conversation.target.username};
            if (conversation.conversationType === 'group') data = {groupId: conversation.target.id};
            data = _.assign(data, {type: conversation.conversationType, text: msg, messageSendingOptions: {}});
            const res = await this.jMessage.sendTextMessage(data);
            return res;
        } catch (e) {
            console.log(e);
        }
    }

    async getMyInfo(): Promise<any> {
        try {
            const myInfo = await this.jMessage.getMyInfo();
            return myInfo;
        } catch (e) {
            console.log(e);
            return false;
        }

    }

    async getUserInfo(username): Promise<any> {
        try {
            const userInfo = await this.jMessage.getUserInfo({username: username});
            return userInfo;
        } catch (e) {
            console.log(e, 'getUserInfo err');
            return false;
        }

    }

    async getGroupInfo(groupId): Promise<any> {
        try {
            const groupInfo = await this.jMessage.getGroupInfo({id: groupId});
            return groupInfo;
        } catch (e) {
            console.log(e, 'getGroupInfo err');
            return false;
        }

    }

    async updateMyAvatar(path: string) {
        try {
            const imgPath = path.startsWith('file://') ? path.replace('file://', '') : path;
            console.log(imgPath.substring(0, imgPath.indexOf('?')), 278);
            const res = await this.jMessage.updateMyAvatar({
                imgPath: imgPath.substring(0, imgPath.indexOf('?'))
            });
            console.log(res, 281);
        } catch (e) {
            console.log(e);
        }
    }

    // async updateMyAvatar(url: string) {
    //
    //     try {
    //
    //         const blob = await this.urlToBlob(url);
    //         // 保存到本地
    //         const file = await this.file.writeFile(this.file.dataDirectory, `${this.nativeService.generateFileName()}.png`, blob);
    //         const imgPath = file.nativeURL.startsWith('file://') ? file.nativeURL.replace('file://', '') : file.nativeURL;
    //
    //         await this.jMessage.updateMyAvatar({
    //             imgPath
    //         });
    //
    //     } catch (err) {
    //         console.error(err);
    //     }
    //
    // }

    async updateMyInfo(data: any) {
        try {
            await this.jMessage.updateMyInfo(data);
        } catch (err) {
            console.log(err);
        }
    }

    async urlToBlob(path: string) {


        const dataUrl = await this.convertToDataURLviaCanvas(normalizeURL(path));

        return this.dataURLtoBlob(dataUrl);
    }

    private dataURLtoBlob(dataurl: string) {
        let arr = dataurl.split(','), type = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }


        return new Blob([u8arr], {type});
    }


    convertToDataURLviaCanvas(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'),
                    dataURL;

                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL();
                canvas = null;
                resolve(dataURL);
            };
            img.onerror = () => {
                reject()
            };
            img.src = url;
        });
    }

    getUserName(params) {
        // return this.http.get<IResponse>(`app/users`, {params})
    }

    async getFriends() {
        try {
            return await this.jMessage.getFriends();
        } catch (err) {
            return err;
        }
    }

    async sendInvitationRequest(username, reason) {
        try {
            return await this.jMessage.sendInvitationRequest({username: username, reason: reason});
        } catch (err) {
            return err;
        }
    }

    async updateFriendNoteName(username, noteName) {
        try {
            console.log(username,noteName);
            return await this.jMessage.updateFriendNoteName({username: username, noteName: noteName})
        } catch (err) {
            console.log(err);
            return err;
        }
    }

}
