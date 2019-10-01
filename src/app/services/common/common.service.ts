import { Injectable } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  
  constructor(public nav: NavController,
    public alert: AlertController,
    public toast: ToastController,
    public loading: LoadingController,
  ) { }

  goTo(page) {
    this.nav.navigateRoot(page);
  }

  async presentToast(message: any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'dark'
    });

    toast.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    alert.present();
  }
}
