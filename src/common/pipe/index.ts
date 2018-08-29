import {NgModule} from "@angular/core";
import {FormatAvatarPipe} from "./formatAvatar.pipe";
import {ChatAvatarDirective} from "./chat-avatar";
import {EllipsisPipe} from "./ellipsis.pipe";

export const PIPE_MODULE_DIRECTIVES = [
    FormatAvatarPipe,
    ChatAvatarDirective,
    EllipsisPipe
];

@NgModule({
    imports: [],
    declarations: [
        ...PIPE_MODULE_DIRECTIVES
    ],
    exports: [
        ...PIPE_MODULE_DIRECTIVES
    ]
})
export class PipeModule {
}
