import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(
    private router        : Router,
    private authService   : AuthService,
    private navCtrl       : NavController,
    private storage       : Storage,
  ){}

  canActivate(
    next    : ActivatedRouteSnapshot,
    state   : RouterStateSnapshot
  ) : Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authService.isLoggedIn;
    if(currentUser){
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
