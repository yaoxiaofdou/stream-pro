import { Component } from '@angular/core';

import { MusicPage } from '../music/music';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabs: Array<Object>;

  tab1Root = HomePage;
  tab2Root = MusicPage;
  tab3Root = ContactPage;

  constructor() {
    this.tabs = [
      {
        root: HomePage,
        tabTitle: '记账',
        tabIcon: 'home'
      }, {
        root: MusicPage,
        tabTitle: '一听了之',
        tabIcon: 'information-circle'
      }, {
        root: ContactPage,
        tabTitle: '账簿',
        tabIcon: 'contacts'
      }
    ]
  }
}
