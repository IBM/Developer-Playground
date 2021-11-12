import { Component, NgZone, OnInit, ElementRef, ViewChild, Input, Output } from '@angular/core';
import { MyAuthService } from '../../services/auth.service';
import { BackendService } from '../../services/backend.service';
import { ClassificationService } from '../../services/classification.service';
import { NgProgress } from '@ngx-progressbar/core';
import { environment } from '../../../environments/environment';
import { io } from "socket.io-client";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RecognizeStream } from '../../core';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';

declare function initBootstrap(): any;
declare function initDOMComponents(): any;
declare var Promise: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() currentUser: any;
  socket: any;

  hasAudioDevice = false;
  isStreaming: boolean;
  stream: any;
  token: string;
  predictions: any;
  sessionMap = new Map();
  detections = [];
  selectedDetections = [];
  dropdownSettings: IDropdownSettings = {};
  userInput: any = {'label': '', 'value': ''};

  // progressRef: NgProgressRef;
  conversationObj: any = {
                        'params': {
                          'input': {'text': '', 'message_type': 'text', 'options': {'alternate_intents': false, 'return_context': true} },
                          'context': {
                            'global': {
                              'system': {
                                'user_id': 'anonymous'
                              }
                            },
                            'skills': {
                              'main skill': {
                                'user_defined': {
                                  'initConversation': true,
                                  'locale': 'en',
                                  'channel': 'WEB',
                                  'save_in_db': false
                                }
                              }
                            }
                          }
                        }
                      };
  conversations: any = [];

  showDetails = false;
  collectionName = null;

  @ViewChild('chatRow', {static: false}) chatRow: ElementRef;
  @ViewChild('chatInputTxt', {static: false}) chatInputTxtElement: ElementRef;

  constructor(private ngZone: NgZone,
    private authService: MyAuthService,
    public backendService: BackendService,
    public classificationService: ClassificationService,
    public progress: NgProgress) {
    this.socket = io(environment.socket.baseUrl);
    // console.log(environment.socket.baseUrl);
    
    const that = this;
      this.authService.userAuth.subscribe(function(userData){
        that.currentUser = userData;
        if (that.currentUser && that.currentUser.id) {
          if (!that.conversations || that.conversations.length === 0) {
              console.log('AFTER USER LOGIN, refreshConversation >>> ');
              // that.refreshConversation();
          }
        }else {
          that.conversationObj.params.context['skills']['main skill']['user_defined'].initConversation = true;
          delete that.conversationObj.params.context['global']['system']['user_id'];
        }
      });

  }

  async ngOnInit() {
    initBootstrap();
    const that = this;
    this.authService.getUserInfo(false).then( result => {
          that.currentUser = result;
            if (that.currentUser && (that.currentUser.id || that.currentUser.uid)) {
              that.refreshConversation();
            }
     },
     error => {
        console.log('USER IS NOT loggedIn !!! ');
     });

     const checking = ['audioinput'];
     navigator.mediaDevices.enumerateDevices()
     .then((devices) => {
       devices.forEach((device) => {
         console.log('Device: >> ', device.kind);
         if (device.kind === checking[0]) {
           this.hasAudioDevice = true;
         }
        });
        console.log('hasAudioDevice: >> ', this.hasAudioDevice);
        if (this.hasAudioDevice) {
          this.fetchSTTToken();
        }
     })
     .catch(function(err) {
       console.log(err.name + ': ' + err.message);
     });

     const model = await this.classificationService.loadModel();
     if (model) {
      await this.initConfigurations();
     }

    //  this.socket.connect();

  }

  async initConfigurations() {
    this.detections = [
      {'name': 'Language', 'id': 'language'},
      {'name': 'Skill', 'id': 'skill'}
    ];
    this.selectedDetections = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };
    return Promise.resolve();
  }

  fetchSTTToken() {
    this.backendService.fetchSTTToken().then(token => {
        this.token = token;
    },
    error => {
       console.log('ERROR fetching STTToken: >>> ');
    });
  }

  highlightReqResp() {
    console.log(this.conversations[this.conversations.length - 1]);
  }

  scrollToBottom = (): void => {
    try {
      this.chatRow.nativeElement.scrollTop = this.chatRow.nativeElement.scrollHeight;
      this.chatInputTxtElement.nativeElement.focus();
    } catch (err) {}
  }

  refreshConversation() {
    this.conversations = [];
    this.sessionMap = new Map();
    this.userInput = {'label': '', 'value': ''};
    this.conversationObj = {
                          'params': {
                            'input': {'text': '', 'message_type': 'text', 'options': {'alternate_intents': false, 'return_context': true} },
                            'context': {
                              'global': {
                                'system': {
                                  'user_id': 'anonymous'
                                }
                              },
                              'skills': {
                                'main skill': {
                                  'user_defined': {
                                    'initConversation': true,
                                    'locale': 'en',
                                    'channel': 'WEB',
                                    'save_in_db': false
                                  }
                                }
                              }
                            }
                          }
                        };
      console.log('In refreshConversation: >>> ', this.conversationObj);
      if (this.currentUser && this.currentUser.id) {
        this.conversationObj.params.context['skills']['main skill']['user_defined']['user_id'] = this.currentUser.id;
        this.fetchConversationResponse();
      }else {
        console.log('No User Found......');
      }
      setTimeout(function(){
          initDOMComponents();
      }, 1000);
  }

  optionSelected(option) {
    console.log('In optionSelected: >> ', option);
    this.userInput.label = option.label;
    this.userInput.text = option.value.input.text;
    // this.conversationObj.params.input.text = option.value.input.text;
    this.fetchConversationResponse();
  }

  suggestionSelected(suggestion) {
    if (!suggestion.output || !suggestion.output.generic || suggestion.output.generic.length === 0) {
      console.log('Do Nothing...');
    } else {
      this.conversations[this.conversations.length - 1].replies[0].output = suggestion.output;
    }
  }

  checkIfEnterPressed(e) {
    if (e.keyCode === 13) {
      console.log('Enter Key Is Hit: >> ');
        // this.fetchConversationResponse();
    }
  }

  setSTTOptions(token: string): RecognizeStream {
      return {
        access_token: token,
        format: true,
        extractResults: true,
        objectMode: true
      };
  }

  startStream(): void {
    this.isStreaming = true;
    this.stream = recognizeMicrophone(this.setSTTOptions(this.token));
    this.ngZone.runOutsideAngular(() => {
      this.stream.on('data', data => {
        this.ngZone.run(() => {
          this.userInput.label = data.alternatives[0].transcript;
          // this.conversationObj.params.input.text = data.alternatives[0].transcript;
          if (data.final) {
            this.stopStream();
          }
        });
      });

      this.stream.on('error', error => {
        this.ngZone.run(() => {
          console.log(error);
        });
      });

    });

  }

  stopStream(): void {
      if (this.stream) {
        this.isStreaming = false;
        this.stream.stop();
        this.fetchConversationResponse();
      }
  }

  showSegmentDetails() {
      this.showDetails = !this.showDetails;
  }

  handleMessageFromWatson(msg)  {
    console.log('Conversation API Response: >>> ', msg);
    if (msg) {
      msg = this.formatOutputResp(msg);
      this.appendOrPushConversation(msg);
      this.userInput = {'label': '', 'value': ''};
      this.conversationObj.params.input = {
                                            'text': '',
                                            'message_type': 'text',
                                            'options': {'alternate_intents': false, 'return_context': true}
                                          }
      this.conversationObj.params.context = msg.context;
      this.conversationObj.params.assistantId = msg.assistantId;
      this.conversationObj.params.sessionId = msg.sessionId;
      this.scrollToBottom();
    }
      this.progress.ref().complete();
  }

  appendOrPushConversation(msg) {
    console.log('IN appendOrPushConversation: >> Context: ', msg.context);
    if (msg.context && msg.context['skills']['main skill']['user_defined']['next_action']) {
          if (msg.context['skills']['main skill']['user_defined']['next_action'] === 'append') {
            // this.conversations[this.conversations.length - 1].replies.push(msg);
            this.conversations[this.conversations.length - 1].replies = [msg];
            msg.context['skills']['main skill']['user_defined']['next_action'] = 'completed';
          }else {
            this.conversations.push({'replies': [msg]});
          }

          this.conversations[this.conversations.length - 1].context = msg.context;

    }else {
        this.conversations.push({'replies': [msg]});
    }
    // console.log("Total Conversations: >>> ", this.conversations.length);
  }

  async fetchConversationResponse() {
        console.log('In fetchConversationResponse: >>> ', this.conversationObj);
        if (this.userInput.text) {
          this.conversationObj.params.input.text = this.userInput.text;
        }else {
          this.conversationObj.params.input.text = this.userInput.label;
        }

        if (this.detections && this.detections.length > 0) {
          this.predictions = await this.doPredictions();
          if (this.predictions && this.predictions.skill && this.predictions.skill.assistantId
            && this.predictions.skill.assistantId !== 'COMMON') {
            this.conversationObj.params.assistantId = this.predictions.skill.assistantId;
            if (this.sessionMap && this.sessionMap.has(this.predictions.skill.assistantId)) {
              const session = this.sessionMap.get(this.predictions.skill.assistantId);
              if (session && session.sessionId) {
                this.conversationObj.params.sessionId = session.sessionId;
              }
            }else {
              delete this.conversationObj.params.sessionId;
            }
          }
        }

        if (!this.conversationObj.params.context['skills']['main skill']['user_defined']['initConversation'] &&
          (!this.conversationObj.params.input.text || this.conversationObj.params.input.text === '')) {
            return false;
        }

        if (this.currentUser) {
            this.conversationObj.params.context['global']['system']['user_id'] = this.currentUser.id;
        }else {
           this.authService.getUserInfo(false).then(result => {
                this.currentUser = result;
                this.conversationObj.params.context['global']['system']['user_id'] = this.currentUser.id;
           },
           error => {
              console.log('ERROR: >>> ', error);
           });
        }

        if (this.conversationObj.params.context['skills']['main skill']['user_defined']['webhook_result_1']) {
            delete this.conversationObj.params.context['skills']['main skill']['user_defined']['webhook_result_1'];
        }

        console.log('this.conversationObj.params.assistantId: >> ', this.conversationObj.params.assistantId);
        console.log('this.conversationObj.params.sessionId: >> ', this.conversationObj.params.sessionId);
        this.conversationObj.params.predictions = this.predictions;
        this.conversationObj.params.timestamp = Date.now();
        this.progress.ref().start();
        console.log('\n\nIN fetchConversationResponse, conversationObj:>>  ', this.conversationObj);
        this.backendService.callAssistant(this.conversationObj).then( response => {
          if (response.context && response['sessionId']) {
            let subscribeToSocket = false;
            if (!this.collectionName || this.collectionName !== response['sessionId'] + '/POST') {
                this.collectionName = '/' + response['sessionId'] + '/POST';
                subscribeToSocket = true;
            }
            if (subscribeToSocket) {
              console.log('Subscribe to Socket: >> ', this.collectionName);
              this.socket.removeAllListeners();
              this.socket.on(this.collectionName, (msg) => {
                console.log('Message received on Socket: >>>');
                this.handleMessageFromWatson(msg);
                setTimeout(() => {
                  this.scrollToBottom()
                }, 400)
              });
            }

          }

          this.handleMessageFromWatson(response);
          setTimeout(() => {
            this.scrollToBottom()
          }, 400)
       },
       error => {
          this.progress.ref().complete();
          console.log('ERROR: >>> ', error);
       });
  }

  formatOutputResp(result) {
    result.input.timestamp = this.conversationObj.params.timestamp;
    result.output.timestamp = new Date();

    if (this.userInput.label) {
      result.input.text = this.userInput.label;
    }

    if (result.assistantId && result.sessionId) {
      this.sessionMap.set(result.assistantId, {'sessionId': result.sessionId});
    }
    console.log('In formatOutputResp, sessionMap: >> ', this.sessionMap);
    return result;
  }

  onDetectionsSelect(item: any) {
    // console.log(item);
    console.log(this.selectedDetections);
  }
  onSelectAll(items: any) {
    // console.log(items);
    console.log(this.selectedDetections);
  }

  async doPredictions(): Promise<any> {
    if (!this.userInput.label || this.userInput.label === '') {
        return;
    }
    console.log('In doPredictions: >>> ', this.userInput.label);
    const [language, prediction] = await Promise.all([this.predictLanguage(), this.predictSkill()]).catch(error => {
      console.log('ERROR : >>> >', error);
      return;
    });
    console.log('SKILL: >>> ', prediction, ', LANGUAGE: >>> ', language);
    this.predictions = {'skill': prediction, 'language': language};
    return this.predictions;
  }

  async predictSkill(): Promise<any> {
    for (const detection of this.selectedDetections) {
      if (detection.id === 'skill') {
        if (this.userInput && this.userInput.label && this.userInput.label.length > 10) {
          const result = await this.classificationService.predictSkill(this.userInput.label);
          return result;
      }
      }
    }
    return 'None';
  }

  async predictLanguage(): Promise<any> {
    for (const detection of this.selectedDetections) {
      if (detection.id === 'language') {
        /*
        if (!this.predictions || !this.predictions.language || this.predictions.language === 'None') {
          return this.classificationService.predictLanguage({'message': this.userInput.label});
        }else {
          return this.predictions.language;
        }
        */
        return this.classificationService.predictLanguage({'message': this.userInput.label});

      }
    }
    return 'None';
  }

  provideFeedback(dialog, feedback) {
    console.log('IN provideFeedback, feedback: >> ', feedback, ', Dialog: >>> ', dialog)
  }

}
