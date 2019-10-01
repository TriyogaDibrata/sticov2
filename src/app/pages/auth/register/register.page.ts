import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;

  constructor( public commonService    : CommonService,
               public loadingCtrl      : LoadingController,
               private authService     : AuthService,
               private formBuilder     : FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'name'      : [null, Validators.compose([
        Validators.required
      ])],
      'nim'       : [null, Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])],
      'email'     : [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'password'  : [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])] ,
      'c_password': [null, Validators.compose([
        Validators.required
      ])]
    }, {
      validator: this.matchPassword
    });
  }

  private matchPassword(AC: AbstractControl){
    const password    = AC.get('password').value;
    const c_password  = AC.get('c_password').value;

    if(password != c_password){
      AC.get('c_password').setErrors({ matchPassword: true })
    } else {
      AC.get('c_password').setErrors(null);
    }
  }

  goTo(page){
    this.commonService.goTo(page);
  }

  async presentLoading(loading){
    return await loading.present();
  }

  async register(form: FormGroup){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    this.presentLoading(loading);

    this.authService.register(form.value.name, form.value.nim, form.value.email, form.value.password, form.value.c_password)
    .subscribe(data => {
      console.log(data['success']['name'])
      if(data['success']){
        loading.dismiss();
        this.commonService.presentToast('Selamat datang '+data['success']['name'])
        this.commonService.goTo('app/tabs/home');
      }
    }, error => {
      loading.dismiss();
      console.log(error);
    });
  }

}
