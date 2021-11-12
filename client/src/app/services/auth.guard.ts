import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { MyAuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: MyAuthService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
      return new Promise((resolve) => {
          this.authService.getUserInfo(false).then( user => {
                  if(user && (user.id || user.uid)){
                    resolve(true);
                  }else{
                    this.router.navigate(['/']);
                    resolve(false);
                  }
           },
           error => {
              console.log("In AuthGuard, USER IS NOT loggedIn !!! ");
              this.router.navigate(['/']);
              resolve(false);
           });
     });
  }

}
