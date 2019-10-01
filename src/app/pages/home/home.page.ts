import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EnvService } from 'src/app/services/env/env.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  token     : any;
  aduans    : any;

  constructor(
    private authService     : AuthService,
    private sharedService   : SharedService,
    public  commonService   : CommonService,
    private htttp           : HttpClient,
    private env             : EnvService,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.getListPengaduan();
  }

  getListPengaduan(){
    this.sharedService.getListPengaduan()
    .subscribe(data => {
      if(data['success']){
        this.aduans = data['data'];
        console.log(data['data']);
      } else {
        this.commonService.presentAlert('There is something wrong', 'Can not load content');
      }
    }, err => {
        this.commonService.presentAlert('There is something wrong', 'Can not load content');
    });
  }

  detail(id){
    this.commonService.goTo(['detail/', id]);
  }

}
