import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SurveyCreateComponent } from './survey-create/survey-create.component';
import { SurveyFinishedComponent } from './survey-finished/survey-finished.component';
import { SurveyLiveComponent } from './survey-live/survey-live.component';

import { SurveyCreateService } from './survey-create/survey-create.service';
import { SurveyLiveService } from './survey-live/survey-live.service';

@NgModule({
  declarations: [
    AppComponent,
    SurveyCreateComponent,
    SurveyFinishedComponent,
    SurveyLiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SurveyCreateService,
    SurveyLiveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
