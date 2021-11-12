import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MyAuthService } from '../../services/auth.service';
import { BackendService } from '../../services/backend.service';
import { NgProgress } from '@ngx-progressbar/core';
import { environment } from '../../../environments/environment';

declare function initBootstrap(): any;
declare function initDOMComponents(): any;

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

  currentUser: any;
  appConfig: any;
  showAddEditAssistant = false;
  selectedAssistant: any;

  constructor(private router: Router,
              private authService: MyAuthService,
              private backendService: BackendService,
              public progress: NgProgress) {

              const that = this;
              this.authService.userAuth.subscribe(function(userData){
                that.currentUser = userData;
                if(!that.currentUser || that.currentUser == null){
                    console.log('No USER FOUND IN ConfigurationsPage: >>> ');
                }else{
                    // that.fetchConfigurations();
                }
              });
   }

  ngOnInit() {
    this.authService.getUserInfo(false).then( result => {
          this.currentUser = result;
            if (this.currentUser && (this.currentUser.id || this.currentUser.uid)){
              this.fetchConfigurations();
            }else {
              this.router.navigate(['/']);
              return false;
            }
     },
     error => {
        console.log('USER IS NOT loggedIn !!! ');
     });
    // this.fetchConfigurations();
    initBootstrap();
  }

  fetchConfigurations() {
    console.log('In fetchConfigurations: >> ');
    this.progress.ref().start();
    const filterPayload = {'filter': {'where': {'key': environment.APP_CONFIG_KEY}}};
    this.backendService.fetchAppConfigurations(filterPayload).then( response => {
        this.progress.ref().complete();
        console.log('fetchAppConfigurations, Resp: >> ', response);
        if (response && response.length > 0 && response[0].output) {
            this.appConfig = response[0];
        }else {
          this.appConfig = {
            'key': environment.APP_CONFIG_KEY,
            'output': {
              'WATSON_ASSISTANT': {
                'API_KEY': '',
                'ASSISTANTS': []
              },
              'WATSON_DISCOVERY': {
                'ENABLE': false,
                'API_KEY': '',
                'ENVIRONMENT_ID': '',
                'CONFIGURATION_ID': '',
                'COLLECTION_ID': ''
              },
              'WATSON_STT_API_KEY': '',
            }
          }
        }
        setTimeout(function(){
            initDOMComponents();
        }, 1000);
   },
   error => {
      this.progress.ref().complete();
      console.log('ERROR: >>> ', error);
      setTimeout(function(){
          initDOMComponents();
      }, 1000);
   });
  }

  makeAssistantDefaut(assistant) {
    console.log('IN makeAssistantDefaut: >> ', assistant);
    for (const wa of this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS) {
      if (wa.id === assistant.id) {
        assistant.default = true;
        wa.default = true;
      }else {
        wa.default = false;
      }
    }
  }

  removeAssistant(assistant) {
    // console.log('IN removeAssistant: >> ', assistant);
    const index = this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS.indexOf(assistant);
    this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS.splice(index, 1);
  }

  editAssistant(assistant) {
    // console.log('IN editAssistant: >> ', assistant);
    this.selectedAssistant = assistant;
    this.showAddEditAssistant = true;
  }

  addAssistant() {
    this.selectedAssistant = {'name': '', 'id': '', 'default': false};
    this.showAddEditAssistant = true;
  }

  saveAssistantDetails() {
    if (!this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS) {
      this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS = [];
    }

    const index = this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS.indexOf(this.selectedAssistant);
    if (index !== -1) {
      this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS[index] = this.selectedAssistant;
    }else {
      this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS.push(this.selectedAssistant);
    }

    if (this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS.length === 1) {
      this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS[0].default = true;
    }

    console.log('IN saveAssistantDetails: >>> ', this.appConfig.output.WATSON_ASSISTANT.ASSISTANTS);
    this.showAddEditAssistant = false;
  }

  cancelSaveAssistant() {
    this.selectedAssistant = {'name': '', 'id': '', 'default': false};
    this.showAddEditAssistant = false;
  }

  saveAppConfig() {
    console.log('In fetchConfigurations: >> ', this.appConfig);
    this.progress.ref().start();
    // let payload = {'key': 'APP_CONFIG', 'output': this.appConfig};
    this.backendService.saveAppConfig(this.appConfig).then( response => {
        this.progress.ref().complete();
        console.log('fetchAppConfigurations, Resp: >> ', response);
        if (response && response.length > 0) {
            this.appConfig = response[0].output;
        }
   },
   error => {
      this.progress.ref().complete();
      console.log('ERROR: >>> ', error);
   });
  }

}
