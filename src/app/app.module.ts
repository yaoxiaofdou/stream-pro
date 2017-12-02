import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// module
import { HomeModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';


// service
import { LoginService } from '../shared/service/login.service';
import { UserService } from '../shared/service/user.service';
import { FunctionService } from '../shared/service/function.service';
import { WarpperService } from '../shared/service/warpper.service';
import { AuthService } from '../shared/service/auth.service';
import { ChartsService } from '../shared/service/charts.service';

// provider
import { HomeProvider } from '../providers/home/home';

// charts
import { ChartModule } from 'ng2-chartjs2';
import { MusicProvider } from '../providers/music/music';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MusicPageModule } from '../pages/music/music.module';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HomeModule,
    LoginPageModule,
    ChartModule,
    MusicPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    UserService,
    FunctionService,
    WarpperService,
    AuthService,
    ChartsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeProvider,
    MusicProvider
  ]
})
export class AppModule {}
