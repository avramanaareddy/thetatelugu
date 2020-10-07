import { Component, ViewChild } from '@angular/core';
import { Globaldata } from '../global/globaldata.component';
import { NavController, NavParams, AlertController, LoadingController, MenuController, Nav } from 'ionic-angular';
import { RestProvider } from '../global/restprovider.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';
import { DatatableComponent } from '@swimlane/ngx-datatable';
 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;
    
  url: SafeUrl = null;


  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public menuCtrl: MenuController, public sanitizer: DomSanitizer, public globaldata: Globaldata,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public provider: RestProvider, public navCtrl: NavController, public navParams: NavParams) {

  }
  onActivate(event) {
    console.log(event.row.name);
  }

  loader: any;
  teluguMatalu: any;
 
  
  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.globaldata.menuEnabled=true;
    console.log(this.globaldata.user);
    console.log('ionViewDidLoad  ');
  }
 

 

}
