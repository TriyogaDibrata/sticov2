import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CommonService } from 'src/app/services/common/common.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-lapor',
  templateUrl: './lapor.page.html',
  styleUrls: ['./lapor.page.scss'],
})
export class LaporPage implements OnInit {

  categories      : any;
  token           : any;
  disabled        : boolean = false;

  user_id         : any;
  topik           : any;
  kategori_id     : any;
  uraian          : any;
  photos          : any;
  base64Image     : any;

  constructor(private sharedService     : SharedService,
              private commonService     : CommonService,
              private authService       : AuthService,
              private camera            : Camera,
              public  alertCtrl         : AlertController,
              public  actionSheet       : ActionSheetController) { 
              }

  ngOnInit() {
    //get categories
    this.sharedService.getKategori()
    .subscribe(data => {
      this.categories = data['kategori'];
    }, err =>{
      console.log(err);
    });
    this.photos = [];
  }

  ionViewWillEnter(){
    this.getUser();
  }

  getUser(){
    this.authService.getUser().subscribe(data => {
      this.user_id = data['success']['id'];
    }, err => {
      console.log(err);
    });
  }

  async deletePhoto(index) {
    const confirm = await this.alertCtrl.create({
      header: 'Apakah anda yakin untuk menghapus gambar ini?',
      message: '',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            console.log('Disagree clicked');
          }
        }, {
          text: 'Ya',
          handler: () => {
            console.log('Agree clicked');
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    await confirm.present();
  }

  async selectPhoto() {
    const actionSheet = await this.actionSheet.create({
      header: 'Upload Gambar',
      buttons: [{
        text: 'Pilih Dari Gallery',
        icon: 'photos',
        handler: () => {
          this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Ambil Gambar',
        icon: 'camera',
        handler: () => {
          this.takePhoto(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Batal',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 100, // picture quality
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      sourceType: sourceType,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }

  save(){
    this.sharedService.postPengaduan(this.user_id, this.kategori_id, this.topik, this.uraian, this.photos).subscribe( data => {
      if(data['success']){
        this.kategori_id = '';
        this.topik = '';
        this.uraian = '';
        this.commonService.presentToast('Data store !');
        this.commonService.goTo('app/tabs/home');
      } else {
        this.commonService.presentAlert('Error', 'Failed to store data');
      }
    }, err => {
       console.log(err);
       this.commonService.presentAlert('Error', 'Failed to store data');
    });
  }

}
