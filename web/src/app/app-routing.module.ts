import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SurveyCreateComponent } from './survey-create/survey-create.component';
import { SurveyLiveComponent } from './survey-live/survey-live.component';
import { SurveyFinishedComponent } from './survey-finished/survey-finished.component';

const routes: Routes = [
    { path: '', redirectTo: '/create', pathMatch: 'full' },
    { path: 'create', component: SurveyCreateComponent },
    { path: 'live', component: SurveyLiveComponent },
    { path: 'finished', component: SurveyFinishedComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
