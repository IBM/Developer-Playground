import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  headers: HttpHeaders;

  userProfile: any;
  accessToken: string;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean = false;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  @Output() userAuth = new EventEmitter();

  constructor(private http: HttpClient, private cookieService: CookieService) {

  }

  public refreshHeaders(){
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-IBM-Client-Id": "default",
      "X-IBM-Client-Secret": "SECRET",
      "Authorization": this.accessToken ? this.accessToken: ""
    });
    return this.headers;
  }

  private _setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login(payload): Promise<any>{
    let POST_URL: string = environment.API_BASE_URL + "/MyUsers/login?include=user";
    let findReq: any = {"filter": {"include": {"relation": "roles"}}};
    if(!payload || !payload.params){
        return Promise.reject("INVALID DATA");
    }else{
        var reqOptions = {headers: this.headers, withCredentials: true, params: findReq};
        var that = this;
        return this.http.post(POST_URL, payload.params, reqOptions)
        .toPromise()
        .then(function(resp){
          var userInfo = resp;
          var authResult = {"userId": userInfo["userId"], "accessToken": userInfo["id"]};
          that._setSession(authResult, userInfo);
          that.refreshHeaders();
          return that.getUserInfo(true).then( userData => {
                // console.log("UserInfo Fetched: >>> ", userData);
                that.userProfile = userData;
                return userData;
           },
           error => {
              console.log("ERROR: >>> ", error);
              if(error.status == 401){
                that.cookieService.deleteAll();
                that.accessToken = undefined;
                that.userProfile = undefined;
                that._setLoggedIn(false);
                that.userAuth.emit(undefined);
              }else{
                that.userProfile = userInfo;
                that.userAuth.emit(userInfo);
              }
           });

        }).catch(this.handleErrorPromise);
    }
  }

  getUserInfo(refresh): Promise<any> {
    if(this.userProfile && !refresh){
      return Promise.resolve(this.userProfile);
    }
    var authData = this.getAuthData();
      if(authData && authData.userId && authData.accessToken){
        this.accessToken = authData.accessToken;
        this.refreshHeaders();
          let GET_URL: string = environment.API_BASE_URL + "/MyUsers/"+authData.userId;
          // let findReq: any = {"filter": {"where": {"id": authData.userId}, "include": {"relation": "identities"}}};
          let findReq: any = {'filter': '{\"include\": {\"relation\": \"roles\"}}'};
          // const findReq = new HttpParams({"filter": "{'include': {relation: 'roles'}}"});
          var reqOptions = {headers: this.headers, params: findReq};
          console.log("reqOptions: >>> ", reqOptions);
          var that = this;
          return this.http.get(GET_URL, reqOptions)
          .toPromise()
          .then(function(resp){
            that.userProfile = resp;
            that._setSession(authData, that.userProfile);
            that.userAuth.emit(that.userProfile);
            return that.userProfile;
          }).catch(function(error){
            console.log("ERROR IN getUserInfo: >>>> ", error);
            if(error.status == 401){
              that.cookieService.deleteAll();
              that.accessToken = undefined;
              that.userProfile = undefined;
              that._setLoggedIn(false);
              that.userAuth.emit(undefined);
            }
          });
      }else{
          return Promise.reject("No User Found !! ");
      }
  }

  private _setSession(authResult, profile) {
    if(!authResult.expiresIn || authResult.expiresIn <= 0){
      authResult.expiresIn = 60000;
    }
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save session data and update login status subject
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    localStorage.setItem("userId", authResult.userId);
    localStorage.setItem("access_token", authResult.accessToken);
    this.accessToken = authResult.accessToken;
    this._setLoggedIn(true);
  }

  logout() {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userId');
    localStorage.removeItem('access_token');
    console.log("IN AuthService.logout:>>>>> ");
    let LOGOUT_URL: string = environment.API_BASE_URL + "/MyUsers/logout";
    var reqOptions = {headers: this.headers};
    var that = this;
    return this.http.post(LOGOUT_URL, {"sid": this.accessToken}, reqOptions)
            .toPromise()
            .then(function(resp){
              that.cookieService.deleteAll();
              that.accessToken = undefined;
              that.userProfile = undefined;
              that._setLoggedIn(false);
              console.log("LOGOUT RESP: >> ", resp);
              that.userAuth.emit(undefined)
              return resp;
          }).catch(this.handleErrorPromise);
  }

  private getAuthData(){
    var accessToken = this.getCookieVal('access_token');
    var userId = this.getCookieVal('userId');
    var expiresAt = Number(this.getCookieVal('expires_at'));
    if(!expiresAt || expiresAt <= 0){
      expiresAt = 60000 + Date.now()
    }
    return {"userId": userId, "expiresAt": expiresAt, accessToken: accessToken};

  }

  private getCookieVal(cookieName){
    var cookieVal = this.cookieService.get(cookieName);
    if(cookieVal && cookieVal.indexOf(":") != -1 && cookieVal.lastIndexOf(".") != -1){
      cookieVal = cookieVal.substring(2, cookieVal.lastIndexOf("."));
      // console.log("From CookieService: ", cookieName, " : ", cookieVal);
      return cookieVal;
    }

    if(!cookieVal){
      cookieVal = localStorage.getItem(cookieName);
    }
    // console.log(cookieName, " : ", cookieVal);
    return cookieVal;
  }

  private extractData(res: Response) {
        let body = res.json();
        return body;
  }

  private handleErrorPromise (error: Response | any) {
      console.error(error || error.message);
       return Promise.reject(error || error.message);
  }

}
