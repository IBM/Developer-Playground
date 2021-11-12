import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
// import {SingleMediaPlayer} from './single-media-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { HomeComponent } from './pages/home/home.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { CookieService } from 'ngx-cookie-service';
import { MyAuthService } from './services/auth.service';
import { SharedService } from './services/shared.service';
import { BackendService } from './services/backend.service';
import { ClassificationService } from './services/classification.service';
import { NgProgressModule } from '@ngx-progressbar/core';
import { MinutesConversionPipe } from './pipes/humanize-mins.pipe';
import {PrettyJsonModule} from 'angular2-prettyjson';
import { ConfigurationsComponent } from './pages/configurations/configurations.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    HomeComponent,
    AnalyticsComponent,
    MinutesConversionPipe,
    ConfigurationsComponent
  ],
  imports: [
    BrowserModule,
    NgProgressModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    PrettyJsonModule,
    BrowserAnimationsModule,
    // MatVideoModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxLinkifyjsModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [SharedService, BackendService, CookieService, MyAuthService, ClassificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
