import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { JMessagePlugin } from '@jiguang-ionic/jmessage';
import { normalizeURL } from 'ionic-angular';


@Directive({
    selector: 'img[chat-avatar]' // Attribute selector
})
export class ChatAvatarDirective implements OnInit {

    @Input('chat-avatar') username: string;




    constructor(
        private el: ElementRef,
        private jMessagePlugin: JMessagePlugin,
    ) {

    }

    ngOnInit() {




        this.downloadThumbUserAvatar();

    }


    private async downloadThumbUserAvatar() {
        try {

            const { filePath } = await this.jMessagePlugin.downloadThumbUserAvatar({
                username: this.username
            });

            console.log(filePath,'!!');


            this.el.nativeElement.src = normalizeURL(filePath);

            let img = new Image();
            img.src = normalizeURL(filePath);

            img.onload = () => {
                img = null;
            };

            img.onerror = () => {
                this.defaultAvatar();
                img = null;
            };


        } catch (err) {
            console.error(err);
            this.defaultAvatar();
        }

    }

    private defaultAvatar() {
        this.el.nativeElement.src = 'assets/imgs/avatars/default-M.png';
    }

}
