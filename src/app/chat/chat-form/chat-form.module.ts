import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ChatFormPage} from "./chat-form";
import {EmojiProvider} from "../../../providers/emoji";
import {TextareaAutosizeModule} from "ngx-textarea-autosize";
import {EmojiPickerComponentModule} from "../../../common/emoji-picker/emoji-picker.module";

@NgModule({
    declarations: [
        ChatFormPage
    ],
    imports: [
        TextareaAutosizeModule,
        EmojiPickerComponentModule,
        IonicPageModule.forChild(ChatFormPage)
    ],
    providers: [
        EmojiProvider
    ]
})

export class ChatFormModule {

}
