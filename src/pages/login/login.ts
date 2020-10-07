import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, IonicPage, LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';
import { Globaldata } from '../global/globaldata.component';
import { RestProvider } from '../global/restprovider.component';
import { HomePage } from '../home/home';
import { ListMataPage } from '../list-mata/list-mata';
import { UsersListPage } from '../users-list/users-list';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  constructor(public menuCtrl: MenuController, public sanitizer: DomSanitizer, public globaldata: Globaldata,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public provider: RestProvider, public navCtrl: NavController, public navParams: NavParams) {

  }

  userNameErrMsg: any;
  passwordErrMsg: any;
  loader: any;
  userName: any;
  password: any;
  ionViewDidLoad() {
    this.menuCtrl.enable(false);
    this.globaldata.menuEnabled = false;
    this.checkUsers()
    console.log('ionViewDidLoad LoginPage');
  }

 

  createAdmin() {
    if (!this.userName) {
      alert('పాలకుని పేరు ఇవ్వండి');
      return;
    }
    if (!this.userName) {
      alert('పాలకుని చాటుమాటను ఇవ్వండి');
      return;
    }
    var user: any = {

      userName: this.userName,
      password: this.password,
      adminUser: 'yes'

    };
    this.loader = this.loadingCtrl.create({
      content: 'పాలకున్ని తయారు చేస్తున్నాము, వేచియుండండి..',
    });
    this.loader.present().then(() => {
      //proceed to save the Member
      this.provider.saveUser(user).subscribe(
        data => {
          var com: any = data;
          console.log(' పాలకుడు తయారు అయ్యాడు')
          console.log(com);

          if (com != null) {
            this.loader.dismiss()
            this.checkUsers();
          }

        },
        err => {
          var errorData: any = err.error;
          console.log(errorData);
          console.log(errorData.responseDesc);
          console.log(errorData.errorMessage);
          //this.memberCodeErrMsg=errorData.responseDesc;
          let alert = this.alertCtrl.create({
            title: 'వెనుతలము  అందుబాటులో లేదు',
            buttons: [
              {
                text: 'అలాగే'
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
  isAdmin: boolean = false;
  checkUsers() {
    this.provider.getUsers().subscribe(
      data => {
        var response: any = data;
        console.log(response);
        if (response != null && response.users.length > 0) {
          var users: any = response.users;
          for (let user of users) {
            if (user.adminUser == 'yes') {
              console.log('there is an admin');
              this.isAdmin = true;
              break;
            }
          }

        } else if (response != null && response.users.length == 0) {
          this.isAdmin = false;
          console.log('there is no admin');
        }

      },
      err => {
        var errorData: any = err.error;
        console.log(errorData);
        console.log(errorData.responseDesc);
        console.log(errorData.errorMessage);
        //this.memberCodeErrMsg=errorData.responseDesc;
        let alert = this.alertCtrl.create({
          title: 'వెనుతలము  అందుబాటులో లేదు',
          buttons: [
            {
              text: 'అలాగే'
            }
          ]
        });
         
        alert.present();
      },
      () => console.log('done saving  data')
    );

  }

  login() {
    if (!this.userName) {
      alert('వాడుకరి పేరు అందివ్వండి ');
      return;

    }
    if (!this.password) {
      alert('వాడుకరి చాటు మాటను  అందివ్వండి ');
      return;

    }
    var user: any = {

      userName: this.userName,
      password: this.password,
      adminUser: 'no'

    };

    this.loader = this.loadingCtrl.create({
      content: 'వాడుకరి వివరాలు ఉన్నాయో లేదో వెతుకుతున్నాము, వేచియుండండి..',
    });
    this.loader.present().then(() => {
      //proceed to save the Member
      this.provider.login(user).subscribe(
        data => {
          var com: any = data;
          console.log('user details:: ')
          console.log(com);

          if (com != null) {

            //this.headerMessage=org.responseDesc;
            let alert = this.alertCtrl.create({
              title: 'వాడుకరి వివరాలు దొరికాయి',
              buttons: [
                {
                  text: 'అలాగే',
                  handler: () => {
                    this.globaldata.user = com;

                    if (this.globaldata.user.adminUser == 'yes') {
                      this.globaldata.pages = [
                        {
                          title: "ఇల్లు",
                          component: HomePage,
                          sub: null
                        },
                        {
                          title: "తెలుగు మాట",
                          component: null,
                          sub: [

                            {
                              title: "మాటల పట్టిక",
                              component: ListMataPage,
                              sub: null
                            }

                          ]
                        },
                        {
                          title: "పాలకుడు",
                          component: null,
                          sub: [
                             
                            {
                              title: "వాడుకరుల మార్పులు చేర్పులు",
                              component: UsersListPage,
                              sub: null
                            }
                          ]
                        },
                        {
                          title: "బయటకు",
                          component: LoginPage,
                          sub: null
                        },


                      ];

                    } else {
                      [

                        {
                          title: "ఇల్లు",
                          component: HomePage,
                          sub: null
                        },
                        {
                          title: "తెలుగు మాట",
                          component: null,
                          sub: [

                            {
                              title: "మాటలు  మార్పులు చేర్పులు",
                              component: ListMataPage,
                              sub: null
                            }

                          ]
                        },
                        {
                          title: "బయటకు",
                          component: LoginPage,
                          sub: null
                        },


                      ];


                    }
                    this.navCtrl.setRoot(HomePage)
                  }
                }
              ],

            });
            this.loader.dismiss();
            alert.present();
          } else {
            //this.headerMessage=org.responseDesc;
            let alert = this.alertCtrl.create({
              title: 'వాడుకరి వివరాలు దొరకలేదు',
              buttons: [
                {
                  text: 'అలాగే',
                  handler: () => {

                  }
                }
              ],

            });
            this.loader.dismiss();
            alert.present();

          }

        },
        err => {
          var errorData: any = err.error;
          console.log(errorData);
          console.log(errorData.responseDesc);
          console.log(errorData.errorMessage);
          //this.memberCodeErrMsg=errorData.responseDesc;
          let alert = this.alertCtrl.create({
            title: 'వెనుతలము  అందుబాటులో లేదు',
            buttons: [
              {
                text: 'అలాగే'
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
