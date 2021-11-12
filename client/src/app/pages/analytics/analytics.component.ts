import { Component, NgZone, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { MyAuthService } from '../../services/auth.service';
import { BackendService } from '../../services/backend.service';
import { ClassificationService } from '../../services/classification.service';
import { NgProgress } from '@ngx-progressbar/core';
// import { lang } from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

declare function initBootstrap(): any;
declare function initDOMComponents(): any;
declare var Promise: any;

@Component({
  selector: 'app-home',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  @Input() currentUser: any;
  predictions: any;
  input: any;

  detections = [];
  selectedDetections = [];
  dropdownSettings: IDropdownSettings = {};

  loadScripts: Promise<any>;

  constructor(private ngZone: NgZone, private authService: MyAuthService,
    public backendService: BackendService,
    public classificationService: ClassificationService,
    public progress: NgProgress) {
    this.input = { 'text': '' };
  }

  ngOnInit() {
    initBootstrap();
    // const that = this;
    Promise.all([this.classificationService.loadUSE(), this.classificationService.loadModel(), this.initConfigurations()]);


    this.loadScripts = new Promise((resolve) => {
      // this.loadJupyterNotebookScript('https://gist.github.com/sinny777/e9a5fba8c6167e47bc37bc89d90ee5a0.js');
      console.log('Jupyter Notebook script loaded');
    });

  }




  loadJupyterNotebookScript(url) {
    this.loadScript(url);
  }

  loadScript(srcUrl) {
    let node = document.createElement('script');
    node.src = srcUrl;
    node.type = 'text/javascript';
    node.async = false;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }


  async initConfigurations() {
    this.detections = [
      { 'name': 'Language', 'id': 'language' },
      { 'name': 'Skill', 'id': 'skill' }
    ];
    this.selectedDetections = [{ 'name': 'Language', 'id': 'language' }];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 2,
      allowSearchFilter: false
    };
    return Promise.resolve();
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
    const [language, prediction] = await Promise.all([this.predictLanguage(), this.predictSkill()]).catch(error => {
      console.log('ERROR : >>> >', error);
      return false;
    });
    console.log('SKILL: >>> ', prediction, ', LANGUAGE: >>> ', language);
    this.predictions = { 'skill': prediction, 'language': language };
    return this.predictions;
  }

  async predictSkill(): Promise<any> {
    for (const detection of this.selectedDetections) {
      if (detection.id === 'skill') {
        if (this.input && this.input.text && this.input.text.length > 10) {
          return this.classificationService.predictSkill(this.input.text);
        }
      }
    }
    return 'None';
  }

  async predictLanguage(): Promise<any> {
    for (const detection of this.selectedDetections) {
      if (detection.id === 'language') {
        if (!this.predictions || !this.predictions.language || this.predictions.language === 'None') {
          return this.classificationService.predictLanguage({ 'message': this.input.text });
        }
      }
    }
    return this.predictions.language;
  }

}
