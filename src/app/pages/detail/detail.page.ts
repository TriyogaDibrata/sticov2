import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  pengaduan_id : any;
  detail : any;
  nama_pelapor : any;
  avatar : any;
  status : any;
  kategori : any;
  comments : any;
  files : any;
  tanggal : any;
  uraian : any;
  topik : any;
  count_comments : any;
  count_files : any;
  user : any;
  user_id : any;

  constructor(private route         : ActivatedRoute,
              private router        : Router,
              private sharedService : SharedService,
              private authService   : AuthService,
              ) { }

  ngOnInit() {
    this.pengaduan_id = this.route.snapshot.paramMap.get('id');
    this.getUser();
    console.log(this.pengaduan_id); 
  }

  ionViewWillEnter(){
    this.getDetail();
  }

  getDetail(){
    this.sharedService.getDetail(this.pengaduan_id)
    .subscribe(data => {
      console.log(data['data']);
      this.detail = data['data'];
      this.nama_pelapor = this.detail['has_user']['name'];
      this.avatar = this.detail['has_user']['avatar'];
      this.status = this.detail['status'];
      this.kategori = this.detail['kategori'];
      this.comments = this.detail['comments'];
      this.files = this.detail['files'];
      this.tanggal = this.detail['created_at'];
      this.uraian = this.detail['uraian'];
      this.topik = this.detail['topik'];
      this.count_comments = this.detail['comments']['length'];
      this.count_files = this.detail['files']['length'];
    }, err => {
      console.log(err);
    })
  }

  getUser(){
    this.authService.getUser()
    .subscribe(data => {
      console.log(data['success']);
      this.user = data['success'];
      this.user_id = this.user['id'];
    })
  }

  postComments(){
    
  }

}
