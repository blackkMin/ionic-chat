import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Content, Events, IonicPage, NavController, NavParams, normalizeURL, Platform, TextInput} from "ionic-angular";
import {JMChatRoomType, JMessagePlugin, JMGroupType, JMSingleType} from '@jiguang-ionic/jmessage';
import * as _ from "lodash";
import {NativeService} from "../../../providers/native.service";
import {chatAppKey, ChatService, UserInfo} from "../chat.service";

@IonicPage()
@Component({
    selector: 'chat-form-page',
    templateUrl: './chat-form.html'
})

export class ChatFormPage implements AfterViewInit {
    public filter = {
        page: 1,
        limit: 15
    };

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: ElementRef;
    @ViewChild(TextInput) private textInput: TextInput;
    msgList: any[] = [];
    user: UserInfo;
    toUser: UserInfo;
    editorMsg = '';
    showEmojiPicker = false;

    conversation: any;

    receiveMessageSub: any;

    username: string;

    groupId: string;

    chatObj: any;

    isRefreshChat: boolean = false;

    constructor(public navParams: NavParams,
                private chatService: ChatService,
                private jMessage: JMessagePlugin,
                private changeDetectorRef: ChangeDetectorRef,
                private nativeService: NativeService,
                public nav: NavController,
                private events: Events) {
        // Get the navParams toUserId parameter
        this.username = this.navParams.get('username');
        this.groupId = this.navParams.get('groupId');

        // Get mock user information
        this.chatService.getMyInfo()
            .then((res) => {
                this.user = res
            });

    }

    ngAfterViewInit() {
        this.scrollToBottom();
    }

    ionViewDidLoad() {
        this.setChatObj();

        //get message list
        this.getMsg();
        this.receiveMessage();
        this.enterConversation();
    }

    ionViewWillUnload() {
        if (this.receiveMessageSub) this.receiveMessageSub.unsubscribe();
    }

    ionViewWillLeave() {
        // unsubscribe
        localStorage.removeItem('inChat');
        this.exitConversation();

        this.events.unsubscribe('chat: refresh');
        if (this.isRefreshChat) {
            this.events.subscribe('chat: refresh', (item) => {
                this.conversation.target.name = item;
            });
            this.isRefreshChat = false;
        }
    }

    ionViewDidEnter() {

    }

    async enterConversation() {
        try {
            await this.jMessage.enterConversation(this.chatObj)
        } catch (err) {
            console.log(err);
        }
    }

    async exitConversation() {
        try {
            await this.jMessage.exitConversation(this.chatObj)
        } catch (err) {
            console.log(err);
        }
    }

    setChatObj() {
        if (!_.isUndefined(this.username)) this.chatObj = {type: 'single', username: this.username};
        if (!_.isUndefined(this.groupId)) this.chatObj = {type: 'group', groupId: this.groupId};
        localStorage.setItem('inChat', JSON.stringify(this.chatObj));
    }

    async getConversation() {
        try {
            const con = await this.jMessage.getConversation(this.chatObj);
            return con;
        } catch (err) {
            console.log(err, 81);
            if (err.code === 2) return await this.createConversation(this.chatObj);
        }
    }

    async createConversation(data) {
        try {
            const res = await this.jMessage.createConversation(data);
            return await this.getConversation();
        } catch (err) {
            console.log(err, 97);
        }
    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    onFocusOut(){
        console.log('onFocusOut');
    }

    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.focus();
        } else {
            this.setTextareaScroll();
        }
        this.content.resize();
        this.scrollToBottom();
    }

    /**
     * @name getMsg
     * @returns {Promise<ChatMessage[]>}
     */
    async getMsg() {
        // Get message list

        this.conversation = await this.getConversation();
        this.toUser = this.conversation.target;


        const msg = await this.chatService.getMsgList(this.conversation, this.filter);
        if (!_.isNil(msg)) this.msgList = _.concat(msg, this.msgList);
        console.log(this.msgList,'~~~');
    }

    /**
     * @name sendMsg
     */
    async sendMsg() {
        if (!this.editorMsg.trim()) return;

        //避免异步等待时间
        const cloneMsg = _.clone(this.editorMsg);
        this.editorMsg = '';

        const res = await this.chatService.sendMsg(this.conversation, cloneMsg);

        this.pushNewMsg(res);

        if (!this.showEmojiPicker) {
            this.focus();
        }
    }

    /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg: any) {
        this.msgList.push(msg);
        this.scrollToBottom();
    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.messageId === id)
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400)
    }

    private focus() {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }

    private setTextareaScroll() {
        const textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    }

    holdKeyboard() {
        if (this.nativeService.isOpen()) {
            this.focus();
        }
    }

    receiveMessage() {
        const vm = this;
        if (!vm.receiveMessageSub) vm.receiveMessageSub = this.chatService.addReceiveMessageListener.subscribe(msg => {
            if ((msg.target.type === 'user' && this.chatObj.type === 'single' && msg.from.username === this.chatObj.username)
                || (msg.target.type === this.chatObj.type && msg.target.id === this.chatObj.groupId)) {
                this.msgList.push(msg);
                this.scrollToBottom1();
            }

        });
    }

    private async scrollToBottom1(): Promise<any> {



        // 等待
        await this.awaitScroll();

        this.changeDetectorRef.detectChanges();

        this.content.scrollToBottom(100);

        this.content.resize();

        await this.awaitScroll();


    }

    // 监听滾動
    private awaitScroll() {

        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {

                try {
                    if (!this.content.isScrolling) {
                        clearInterval(timer);
                        resolve();
                    }
                } catch (err) {
                    clearInterval(timer);
                    reject();
                }


            }, 0)
        });
    }

    async doRefresh(refresher) {
        this.filter.page++;
        await this.getMsg();
        refresher.complete();
    }

    goChatDetail() {
        this.isRefreshChat = true;
        this.nav.push('ChatDetailPage', {data: this.chatObj});
    }
}
