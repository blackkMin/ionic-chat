import { Component } from '@angular/core';
import {IonicPage} from "ionic-angular";

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'ChatListPage';
  tab2Root = 'AddressBookPage';
  tab3Root = 'UserPage';
  tab4Root = 'DynamicFormPage';

  constructor() {

  }
}
