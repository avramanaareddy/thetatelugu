import { Component, ViewChild } from '@angular/core';
import {  MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globaldata } from '../pages/global/globaldata.component';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav; 
  rootPage: any = LoginPage;  
   
  
  constructor(public menuCtrl: MenuController,public globaldata:Globaldata,public platform: Platform, public statusBar: StatusBar, 
    public splashScreen: SplashScreen) {
    this.initializeApp();
    console.log(this.menuCtrl.isEnabled());
    this.globaldata.menuEnabled=this.menuCtrl.isEnabled();
    
  } 
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }


  showLevel1: any;
  errorMsg: any;
  openPage(page) {
    if (page.component != null) {
      //this.navCtrl.setRoot();
      this.nav.setRoot(page.component)
    }
  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = idx;
    } else {
      this.showLevel1 = idx;
    }
  };
  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  }
}
