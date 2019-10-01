import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user          : any;
  user_id       : any;
  mylists       : any;
  count_lists   : any;

  constructor(
    private authService     : AuthService,
    private sharedService   : SharedService,
    private commonService   : CommonService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUser();
  }

  getUser(){
    this.authService.getUser().subscribe(data => {
      console.log(data['success']);
      this.user = data['success'];
      this.user_id = data['success']['id'];
      if(this.user_id){
        this.getMyList(this.user_id);
      }
    }, err => {
      console.log(err);
    });
  }

  getMyList(user_id){
    this.sharedService.getMyLists(user_id)
    .subscribe( data => {
      this.mylists = data['data'];
      this.count_lists = data['count'];
    }, err => {
      this.commonService.presentAlert('Something went wrong', err);
    });
  }

}
