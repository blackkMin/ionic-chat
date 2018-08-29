import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ChatListModal} from "./chat-list-modal";

@NgModule({
    declarations: [
        ChatListModal
    ],
    imports: [
        IonicPageModule.forChild(ChatListModal)
    ]
})

export class ChatListModalModule {

}