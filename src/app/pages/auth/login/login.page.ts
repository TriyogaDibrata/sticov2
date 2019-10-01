import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public loader   : any;

  constructor(public  commonService    : CommonService,
              private formBuilder      : FormBuilder,
              private authService      : AuthService,
              public loadingCtrl       : LoadingController,
              ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    });
  }

  ionViewWillEnter(){
    this.authService.getToken().then(data => {
      if(this.authService.isLoggedIn){
        this.commonService.goTo('app/tabs/home');
      }
    })
  }

  goTo(page) {
    this.commonService.goTo(page);
  }

  async showLoading(loading) {
    return await loading.present();
  }

  async login(form: FormGroup){
    const loading = await this.loadingCtrl.create({
      message: "Mohon Tunggu ..."
    });

    this.showLoading(loading);

    this.authService.login(form.value.email, form.value.password)
    .subscribe(data => {
      //login success 
      if(data) {
        this.commonService.presentToast('Login Berhasil');
        this.commonService.goTo('app/tabs/home');
        loading.dismiss();
      }
    }, err => {
      console.log(err['error']);
      this.commonService.presentAlert('Login Gagal', err['error']['error']);
      loading.dismiss();
    });
  }

}
