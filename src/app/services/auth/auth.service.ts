import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env/env.service';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token           : any;
  isLoggedIn      : boolean = false;
  user_id         : any;

  constructor( private http     : HttpClient,
               private env      : EnvService,
               private storage  : Storage,  
              ) { }


  login(email: String, password: String) {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    });

    return this.http.post(this.env.API_URL + 'login',
    { email: email, password: password }, {headers : headers})
    .pipe(
      tap(data => {
        this.storage.set('token', data['success']['token'])
        .then(
          () => {
            console.log('Token Berhasil Disimpan')
          }, error => console.log('Tidak dapat menyimpan tokrn')
        );
        this.token = data['success']['token'];
        this.isLoggedIn = true;
        return data['success']['token'];
      })
    )
  }

  register(name: String, nim: Number, email: String, password: String, c_password: String){
    return this.http.post(this.env.API_URL+ 'register',
    {name: name, nim: nim, email: email, password: password, password_confirmation: c_password})
  }

  getToken(){
    return this.storage.get('token')
    .then(data => {
      this.token = data;
      if(this.token != null){
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false
      }
    }, err => {
      console.log(err);
      this.token  = null;
      this.isLoggedIn   = false;
    });
  }

  getUser(){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Authorization' : 'Bearer ' + this.token
    });

    return this.http.get(this.env.API_URL + 'user', { headers : headers })
    .pipe(
    );
  }
}