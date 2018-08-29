import {NgModule, Directive} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from "../pipe/index";
import {FormMessageModule} from "../control-message/form-message.module";

export const SHARED_MODULE_DIRECTIVES = [
    // core
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // UI plugin
    ReactiveFormsModule,

    // other
    PipeModule,
    FormMessageModule
];

@NgModule({
    imports: [...SHARED_MODULE_DIRECTIVES],
    declarations: [],
    exports: [...SHARED_MODULE_DIRECTIVES]
})
export class SharedModule {
}
