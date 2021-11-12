import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sessionData: any;
  private currentUser: any;

    constructor() {
        this.sessionData = {};
     }

     public setCurrentUser(user){
       console.log('IN setCurrentUser: >> ', user);
       this.currentUser = user;
     }

     public getCurrentUser(){
       return this.currentUser;
     }

}
