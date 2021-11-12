import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MyAuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: MyAuthService,) {
      this.headers = this.authService.refreshHeaders();
   }

   callAssistant(payload): Promise<any>{
     let POST_URL: string = environment.API_BASE_URL + "/Conversations/converse";
     if(!payload || !payload.params || (!payload.params.input && !payload.params.context.initConversation)){
         return Promise.reject("INVALID DATA");
     }else{
         this.headers = this.authService.refreshHeaders();
         var reqOptions = {headers: this.headers};
         return this.http.post(POST_URL, payload, reqOptions)
         .toPromise()
         .then(this.extractData)
               .catch(this.handleErrorPromise);
     }
   }

   fetchAppConfigurations(payload): Promise<any>{
      let GET_URL: string = environment.API_BASE_URL + "/Mappings";
      let params = new HttpParams();
      let filter = JSON.stringify(payload.filter);
      console.log(filter);
      params = params.set('filter', filter);
      this.headers = this.authService.refreshHeaders();
      var reqOptions = {headers: this.headers, params: params};
      return this.http.get(GET_URL, reqOptions)
       .toPromise()
       .then(this.extractData)
             .catch(this.handleErrorPromise);
   }

   saveAppConfig(payload): Promise<any>{
     console.log("IN saveAppConfig: >> ", payload);
      let POST_URL: string = environment.API_BASE_URL + "/Mappings";
      this.headers = this.authService.refreshHeaders();
      var reqOptions = {headers: this.headers};
      if(payload.id){
        POST_URL = POST_URL + "/"+payload.id;
        return this.http.put(POST_URL, payload, reqOptions)
        .toPromise()
        .then(this.extractData)
              .catch(this.handleErrorPromise);
      }else{
        return this.http.post(POST_URL, payload, reqOptions)
        .toPromise()
        .then(this.extractData)
              .catch(this.handleErrorPromise);
      }
    }

    fetchSTTToken(): Promise<any>{
       let GET_URL: string = environment.API_BASE_URL + "/Conversations/stt/token";
       this.headers = this.authService.refreshHeaders();
       var reqOptions = {headers: this.headers};
       return this.http.get(GET_URL, reqOptions)
        .toPromise()
        .then(this.extractData)
              .catch(this.handleErrorPromise);
    }

   private extractData(res: Response) {
         let body = res;
         return body;
   }

   private handleErrorPromise (error: Response | any) {
 	     console.error(error || error.message);
        return Promise.reject(error || error.message);
   }

}
