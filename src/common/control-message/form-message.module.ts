import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormMessage} from "./form-message";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FormMessage
  ],
  exports: [
    FormMessage
  ]
})
export class FormMessageModule {
}
