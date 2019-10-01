import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env/env.service';
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  kategori : any;
  token    : any;

  constructor(
                public http           : HttpClient,
                private env           : EnvService,
                private storage       : Storage,
                private authService   : AuthService,
            ) { 
              this.getBearerToken();
            }

  
  getKategori(){
    let headers = new HttpHeaders({
      'Content-Tyoe' : 'application/json',
      'Accept'       : 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get(this.env.API_URL + 'kategori/get', {headers : headers})
    .pipe(
      //call function to return data
    );
  }

  getBearerToken(){
    this.token = this.authService.token;
  }

  postPengaduan(user_id, kategori_id, topik, uraian, photos){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept'       : 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    let data = {
      'user_id'       : user_id,
      'kategori_id'   : kategori_id,
      'topik'         : topik,
      'uraian'        : uraian,
      'photos'        : photos,
    }

    return this.http.post(this.env.API_URL + 'pengaduan/post', data, {headers : headers})
    .pipe(
    );
  }

  getListPengaduan(){
    let headers = new HttpHeaders ({
      'Accept'        : 'application/json',
      'Content-Type'  : 'application/json',
      'Authorization' : 'Bearer ' + this.token,
    });

    return this.http.get(this.env.API_URL + 'pengaduan/list', {headers : headers})
    .pipe(
    );  
  }

  getMyLists(user_id){
    let headers = new HttpHeaders({
      'Accept'        : 'application/json',
      'Content-Type'  : 'application/json',
      'Authorization' : 'Bearer ' + this.token,
    });

    return this.http.get(this.env.API_URL + 'pengaduan/mylist?user_id='+user_id, {headers : headers})
    .pipe(
    );
  }

  getDetail(pengaduan_id){
    let headers = new HttpHeaders({
      'Accept'        : 'application/json',
      'Content-Type'  : 'application/json',
      'Authorization' : 'Bearer ' + this.token,
    });

    return this.http.get(this.env.API_URL + 'pengaduan/detail?pengaduan_id='+pengaduan_id, {headers : headers})
    .pipe(
    );
  }

  postKomentar(user_id, pengaduan_id, komentar){
    let headers = new HttpHeaders({
      'Accept'        : 'application/json',
      'Content-Type'  : 'application/json',
      'Authorization' : 'Bearer ' + this.token,
    });

    let data = {
      'user_id'       : user_id,
      'pengaduan_id'  : pengaduan_id,
      'komentar'      : komentar
    }

    return this.http.post(this.env.API_URL + 'pengaduan/post-komentar', data, {headers : headers})
    .pipe(
    );
  }
}
