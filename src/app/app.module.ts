import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AnimationService} from 'css-animator'; 
import { Globaldata } from '../pages/global/globaldata.component';

import { FormsModule } from '@angular/forms';
import { DocumentViewModule } from 'ngx-document-view';
import { HttpClientModule } from  '@angular/common/http';
import { RestProvider } from '../pages/global/restprovider.component';
import {NgxDatatableModule  } from '@swimlane/ngx-datatable';
import { LoginPage } from '../pages/login/login';
import { AdminPage } from '../pages/admin/admin';
import { UsersListPage } from '../pages/users-list/users-list';
import { ListMataPage } from '../pages/list-mata/list-mata';


@NgModule({
  declarations: [
    MyApp, 
    LoginPage,
    AdminPage,
    HomePage,
    UsersListPage,
    ListMataPage,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DocumentViewModule,
    NgxDatatableModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AdminPage,
    HomePage,
    UsersListPage,
    ListMataPage,
  ],
  providers: [
    StatusBar,
    
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AnimationService,Globaldata,RestProvider
  ]
})
export class AppModule {}
