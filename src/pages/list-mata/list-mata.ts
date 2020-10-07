import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { RestProvider } from '../global/restprovider.component';
import 'rxjs/Rx';
import { Globaldata } from '../global/globaldata.component';

@IonicPage()
@Component({
  selector: 'page-list-mata',
  templateUrl: 'list-mata.html',
})
export class ListMataPage {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(public alertCtrl: AlertController, public provider: RestProvider,
    public globaldata: Globaldata,
    public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getTeluguMatalu();
     console.log(this.globaldata.user.adminUser);
  }
  loader: any;
  teluguMatalu: any;
  reqTeluguMata: any;
  viewMata: any = null;
  isEdit: any = false;
  isNew: any = false;
  teluguMata: any;
  mulamu: any;
  rating: any;
  englishMeaning: any;
  teluguMeaning: any;
  alternateMeaning: any;
  comments: any;
  /**telugu mata data */
  teluguMataErrMsg: any;
  mulamuErrMsg: any;
  ratingErrMsg: any;

  getReport() {
    
    var jsonData:any=[];
    var teluguMata = null;
    var mulamu = null;
    var rating = null;
    var teluguMeaning =null;
    var englishMeaning = null;
    var alternateMeaning = null;
    var comments = null;
    if(this.teluguMatalu!=null && this.teluguMatalu.length>0){
      for(let mata of this.teluguMatalu){
       
        
        ({teluguMata, mulamu, rating,teluguMeaning,englishMeaning,alternateMeaning,comments} = mata);
        jsonData.push({teluguMata, mulamu, rating,teluguMeaning,englishMeaning,alternateMeaning,comments})
      
    }
  }
    var date = new Date();
    var d = date.toLocaleDateString();
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData));
    var dlAnchorElem: any = document.getElementById('test');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "తెలుగుమాటలు-"+d+" .json");
    dlAnchorElem.click();
  }

  checkTeluguMata(){
    if(!this.teluguMata || this.teluguMata=="" || this.teluguMata.trim()==""){
       alert('తెలుగు మాట అందివ్వండి');
       return;
    }else{
     this.teluguMata=this.teluguMata.trim();
     this.loader = this.loadingCtrl.create({
       content: 'తెలుగు మాట వెతుకుతున్నది వేచి ఉండండి...',
     });

     let tm={
       teluguMata:this.teluguMata
     }
      console.log(tm)
     this.loader.present().then(() => {
       this.provider.getTeluguMata(tm).subscribe(
         data => {
           var com: any = data;
           console.log(com);
           if(com!=null){
             let alert = this.alertCtrl.create({
               title: 'ఈ "'+this.teluguMata+'" అను మాట ఇదివరకే చేర్చబడినది' ,
               buttons: [
                 {
                   text: 'అలాగే',
                 }
               ],
             });
             
             alert.present();
           }
           this.loader.dismiss();
 
         },
         err => {
           var errorData: any = err.error;
           console.log(errorData)
           this.loader.dismiss();
           
         },
         () => console.log('తెలుగు మాట దొరకలేదు ')
       );
     });
 

    }

 }
  addNewMata() {

    console.log('Data is validated');
    if (!this.teluguMata || this.teluguMata.trim() == "") {
      alert('తెలుగు మాటను అందివ్వండి');
      return;
    }
    if (!this.mulamu || this.mulamu.trim() == "") {
      alert('మూలమును అందివ్వండి');
      return;
    }
    if (!this.teluguMeaning || this.teluguMeaning.trim() == "") {
      alert('మాటకు తెల్లము[అర్థము] అందివ్వండి ');
      return;
    }
    if (!this.rating) {
      alert('మాట మట్టు[రేటింగు] తెలుపండి');
      return;
    }

    var teluguMata: any = {

      teluguMata: this.teluguMata,
      mulamu: this.mulamu,
      enteredPersonName: this.globaldata.user.userName,
      rating: this.rating,
      teluguMeaning: this.teluguMeaning,
      englishMeaning: this.englishMeaning,
      alternateMeaning: this.alternateMeaning,
      comments: this.comments
    };

    console.log('%%%%%%%%%%%%%%%%% తెలుగు మాట %%%%%%%%%  ');
    console.log(teluguMata);
    this.loader = this.loadingCtrl.create({
      content: 'తెలుగు మాటను చేర్చుచున్నాము వేచి ఉండండి...',
    });

    this.loader.present().then(() => {
      //proceed to save the Member
      this.provider.saveTeluguMata(teluguMata).subscribe(
        data => {
          var teluguMata: any = data;
          console.log(teluguMata);
          console.log(teluguMata.responseDesc);
          //this.headerMessage=org.responseDesc;
          let alert = this.alertCtrl.create({
            title: teluguMata.responseDesc,
            buttons: [
              {
                text: 'అలాగే',
                handler: () => {
                  this.teluguMatalu();
                  this.reset();
                  this.isNew=false;
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
        () => console.log('చేర్చుట అయింది')
      );

    });

  }
  reset(){
    this.isNew=false;
    this.isEdit=false;
    this.teluguMata = null;
    this.mulamu = null;
    this.rating = null;
    this.teluguMeaning =null;
    this.englishMeaning = null;
    this.alternateMeaning = null;
    this.comments = null;

  }
  editMata(record) {
    this.isNew=false;
    this.isEdit=true;
    this.teluguMata = record.teluguMata
    this.mulamu = record.mulamu
    this.rating = record.rating;
    this.teluguMeaning = record.teluguMeaning;
    this.englishMeaning = record.englishMeaning;
    this.alternateMeaning = record.alternateMeaning;
    this.comments = record.comments;
  }

  editTeluguMataData() {

    if (!this.mulamu) {
      alert(' మూలమును అందివ్వండి');
      return;
    }
    if (!this.rating) {
      alert('మట్టును   అందివ్వండి');
      return;
    }
    if (!this.teluguMeaning || this.teluguMeaning.trim() == "") {
      alert('తెల్లమును  అందివ్వండి  ');
      return;
    }
    if (!this.englishMeaning || this.englishMeaning.trim() == "") {
      alert('ఆంగ్లములో తెల్లము  అందివ్వండి  ');
      return;
    }
     
    var maata: any = {
      teluguMata:this.teluguMata ,
      mulamu:this.mulamu,
      rating:this.rating,
      teluguMeaning:this.teluguMeaning,
      englishMeaning:this.englishMeaning,
      alternateMeaning:this.alternateMeaning ,
      comments:this.comments,
    };



    this.loader = this.loadingCtrl.create({
      content: 'తెలుగుమాటను మార్చుచున్నాము వేచియుండండి...',
    });

    this.loader.present().then(() => {
      //proceed to save  
      this.provider.updateTeluguMata(maata).subscribe(
        data => {
          var com: any = data;
          console.log(com);
          let alert = this.alertCtrl.create({
            title: 'తెలుగు మాట వివరములు  మార్చబడినవి',
            buttons: [
              {
                text: 'అలాగే',
                handler: () => {
                  this.getTeluguMatalu();
                  this.isEdit = false;
                  this.isNew = false;
                  this.viewMata = null;
                  this.reset();
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
  searchTeluguMata() {
    if (!this.reqTeluguMata) {
      alert('తెలుగు మాటను అందివ్వండి');
      return;
    }

    this.reqTeluguMata = this.reqTeluguMata.trim();
    this.loader = this.loadingCtrl.create({
      content: 'తెలుగు మాట వెతుకుతున్నది వేచి ఉండండి...',
    });

    let tm = {
      teluguMata: this.reqTeluguMata
    }
    console.log(tm)
    this.loader.present().then(() => {
      this.provider.getTeluguMata(tm).subscribe(
        data => {
          var com: any = data;
          console.log(com);
          if (com != null) {
            this.teluguMatalu = [com]
          }
          this.loader.dismiss();

        },
        err => {
          var errorData: any = err.error;
          console.log(errorData)
          this.loader.dismiss();

        },
        () => console.log('తెలుగు మాట దొరకలేదు ')
      );
    });



  }


  deleteMata(record) {

    let alert = this.alertCtrl.create({
      title: 'తెలుగుమాటను పూర్తిగా తొలగించాలని అనుకుంటున్నారా!',
      buttons: [
        {
          text: 'అవును',
          handler: () => {
            this.deleteTeluguMata(record);
          }
        },
        {
          text: 'కాదు'
        }
      ]
    });

    alert.present();

  }

  deleteTeluguMata(record) {
    console.log('తెలుగుమాట  తొలగింపు', record);

    this.loader = this.loadingCtrl.create({
      content: ' తెలుగుమాటను తొలగిస్తున్నాము ఆగండి..',
    });
    this.loader.present().then(() => {
      //proceed to save the Member
      this.provider.deleteTeluguMata(record).subscribe(
        data => {
          var com: any = data;
          console.log(com);

          //this.headerMessage=org.responseDesc;
          let alert = this.alertCtrl.create({
            title: 'తెలుగుమాట  పూర్తిగా తొలగించబడింది',
            buttons: [
              {
                text: 'అలాగే',
                handler: () => {
                  this.getTeluguMatalu();
                }
              }
            ],
          });
          this.loader.dismiss();
          alert.present();

        },
        err => {
          var errorData: any = err.error;
          //this.memberCodeErrMsg=errorData.responseDesc;
          let alert = this.alertCtrl.create({
            title: "తెలుగుమాటను తొలగించుట జరుగలేదు..",
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
  getTeluguMatalu() {
    this.loader = this.loadingCtrl.create({
      content: "Loading telugu matalu. Please wait..."
    })
    this.loader.present().then(() => {
      this.provider.getTeluguMatalu().subscribe(data => {
        var comData: any = data;
        this.teluguMatalu = comData.teluguMatas;
        console.log(this.teluguMatalu);
        this.loader.dismiss();

      }, err => {
        var errorData: any = err.error;
        console.log(errorData);
        let alert = this.alertCtrl.create({
          title: "No Records Found",
          buttons: [
            {
              text: 'Ok'
            }
          ]
        });
        this.loader.dismiss();
        alert.present();

      }, () => {
        console.log('Member Data loaded Successfully');
      });
    });

  }

}
