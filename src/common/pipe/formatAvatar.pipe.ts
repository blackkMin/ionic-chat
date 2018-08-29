import { Pipe, PipeTransform } from '@angular/core';
import {normalizeURL} from "ionic-angular";
import {JMUserInfo} from "@jiguang-ionic/jmessage";

@Pipe({
    name: 'formatAvatar'
})

export class FormatAvatarPipe implements PipeTransform {
    transform(value: any): any {
        const avatar = (value as JMUserInfo).avatarThumbPath;
        // 设置头像
        return normalizeURL(avatar);
    }
}
