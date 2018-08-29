import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ChatListPage} from "./chat-list";
import {SharedModule} from "../../../common/shared/shared.module";

@NgModule({
    declarations: [
        ChatListPage
    ],
    imports: [
        SharedModule,
        IonicPageModule.forChild(ChatListPage)
    ]
})

export class ChatListModule {

}
