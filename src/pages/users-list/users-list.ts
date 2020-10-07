import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../global/restprovider.component';
import 'rxjs/Rx';
 import 'rxjs/add/observable/fromEvent';

 @IonicPage()
@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html',
})
export class UsersListPage {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(public alertCtrl: AlertController, public provider: RestProvider, public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getUsers();
    console.log('ionViewDidLoad users list');
  }
  loader: any;
  users: any;
  getUsers() {
    this.loader = this.loadingCtrl.create({
      content: "వాడుకరులను తెస్తున్నాము వేచియుండండి..."
    })
    this.loader.present().then(() => {
      this.provider.getUsers().subscribe(data => {
        var comData: any = data;
        this.users = comData.users;
        console.log(this.users);
        this.loader.dismiss();

      }, err => {
        var errorData: any = err.error;
        console.log(errorData);
        let alert = this.alertCtrl.create({
          title: "వాడుకరులెవ్వరూ లేరు",
          buttons: [
            {
              text: 'Ok'
            }
          ]
        });
        this.loader.dismiss();
        alert.present();

      }, () => {
        console.log("వాడుకరులు ఉన్నారు");
      });
    });

  }
  adminOptions: any = [{
    "code": "yes",
    "value": "అవును"
  },
  {
    "code": "no",
    "value": "కాదు"
  }
  ];

  userName: any;
  password: any;
  adminUser: any;
  newUser: any = false;

  addNewUser() {
    if (!this.userName || this.userName.trim() == "") {
      alert(' వాడుకరిని అందివ్వండి');
      return;
    }
    if (!this.password || this.password.trim() == "") {
      alert('చాటుమాటను  అందివ్వండి');
      return;
    }
    if (!this.adminUser || this.adminUser.trim() == "") {
      alert('పాలకుడో కాదో తెలుపండి  ');
      return;
    }
    var user: any = {
      userName: this.userName,
      password: this.password,
      adminUser: this.adminUser
    };
    console.log('%%%%%%%%%%%%%%%%% తెలుగు మాట %%%%%%%%%  ');
    console.log(user);
    this.loader = this.loadingCtrl.create({
      content: 'వాడుకరిని  చేర్చుచున్నాము వేచి ఉండండి...',
    });

    this.loader.present().then(() => {
      //proceed to save the Member
      this.provider.saveUser(user).subscribe(
        data => {
          var user: any = data;
          console.log(user);
          //this.headerMessage=org.responseDesc;
          let alert = this.alertCtrl.create({
            title: 'వాడుకరి తయారు చెయ్యబడ్డాడు',
            buttons: [
              {
                text: 'అలాగే',
                handler: () => {
                  this.userName = null;
                  this.adminUser = null;
                  this.password = null;
                  this.newUser = false;
                  this.getUsers();
                }
              }
            ],

          });
          this.loader.dismiss();
          alert.present();
        },
        err => {
          var errorData: any = err.error;
          console.log(errorData);
          console.log(errorData.responseDesc);
          console.log(errorData.errorMessage);
          //this.memberCodeErrMsg=errorData.responseDesc;
          let alert = this.alertCtrl.create({
            title: errorData.responseDesc,
            buttons: [
              {
                text: 'అలాగే'
              }
            ]
          });
          this.loader.dismiss();
          alert.present();

        },
        () => console.log('చేర్చుట జరిగింది')
      );

    });

  }
  editUser = false;
  updateUser(record) {

    this.userName = record.userName;
    this.password = record.password;
    this.adminUser = record.adminUser;
  }
  deleteUser(record) {

    let alert = this.alertCtrl.create({
      title: 'వాడుకరిని పూర్తిగా తొలగించాలని అనుకుంటున్నారా!',
      buttons: [
        {
          text: 'అవును',
          handler: () => {
            this.deleteUserDetails(record);
          }
        },
        {
          text: 'కాదు'
        }
      ]
    });

    alert.present();

  }

  deleteUserDetails(record) {
    console.log('వాడుకరి తొలగింపు', record);

    this.loader = this.loadingCtrl.create({
      content: ' వాడుకరిని తొలగిస్తున్నాము ఆగండి..',
    });
    this.loader.present().then(() => {
      //proceed to save the Member
      this.provider.deleteUser(record).subscribe(
        data => {
          var com: any = data;
          console.log(com);
           
          //this.headerMessage=org.responseDesc;
          let alert = this.alertCtrl.create({
            title: 'వాడుకరి పూర్తిగా తొలగించబడ్డాడు' ,
            buttons: [
              {
                text: 'అలాగే',
                handler: () => {
                 this.getUsers();
                }
              }
            ],
          });
          this.loader.dismiss();
          alert.present();

        },
        err => {
          var errorData: any = err.error;
          let alert = this.alertCtrl.create({
            title: "తొలగించుట ఆగిపోయింది..",
            buttons: [
              {
                text: 'అలాగే',
                handler:()=>{
                 console.log(errorData)

                }
              }
            ]
          });
          this.loader.dismiss();
          alert.present();
        },
        () => console.log('తెలుగు మాట తెచ్చుట కుదరలేదు ')
      );
    });


  }

  updateUserData() {

    if (!this.userName || this.userName.trim() == "") {
      alert(' వాడుకరిని అందివ్వండి');
      return;
    }
    if (!this.password || this.password.trim() == "") {
      alert('చాటుమాటను  అందివ్వండి');
      return;
    }
    if (!this.adminUser || this.adminUser.trim() == "") {
      alert('పాలకుడో కాదో తెలుపండి  ');
      return;
    }
    console.log('Data is validated');
    var user: any = {

      userName: this.userName,
      password: this.password,
      adminUser: this.adminUser,

    };



    this.loader = this.loadingCtrl.create({
      content: 'Updating the telugu mata...Please Wait...',
    });

    this.loader.present().then(() => {
      //proceed to save  
      this.provider.updateUser(user).subscribe(
        data => {
          var com: any = data;
          console.log(com);
          let alert = this.alertCtrl.create({
            title: 'వాడుకరి వివరము మార్చబడినది',
            buttons: [
              {
                text: 'అలాగే',
                handler: () => {
                  this.getUsers();
                  this.editUser = false;
                  this.newUser = false;
                  this.userName = null;
                  this.adminUser = null;
                  this.password = null;
                }
              }
            ],

          });
          this.loader.dismiss();
          alert.present();
        },
        err => {
          var errorData: any = err.error;
          console.log(errorData);
          console.log(errorData.responseDesc);
          console.log(errorData.errorMessage);
          let alert = this.alertCtrl.create({
            title: errorData.responseDesc,
            buttons: [
              {
                text: 'Ok'
              }
            ]
          });
          this.loader.dismiss();
          alert.present();
        },
        () => console.log('done saving  data')
      );
    });

  }

}
