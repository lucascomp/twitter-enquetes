import { Component, OnInit } from '@angular/core';

import { SurveyLiveService } from './survey-live.service';

@Component({
    selector: 'app-survey-live',
    templateUrl: './survey-live.html',
    styleUrls: [ './survey-live.scss' ]
})
export class SurveyLiveComponent implements OnInit {

    survey: any;

    showError = false;
    cancelada = false;
    finalizada = false;

    constructor(
        private surveyLiveService: SurveyLiveService
    ) {}

    ngOnInit() {
        this.surveyLiveService.getSurvey()
            .then((survey: any) => {
                if (survey.length === 0) {
                    this.showError = true;
                } else if (survey[0].status === 'OPEN') {
                    this.survey = survey[0];
                    this.applySocket();
                } else {
                    this.finalizada = true;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    applySocket() {
        this.surveyLiveService.followSurvey((survey) => {
            this.survey = survey;
        });
    }

    cancel() {
        this.surveyLiveService.cancelSurvey(this.survey._id)
            .then((data) => {
                this.cancelada = true;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    finish() {
        this.surveyLiveService.finishSurvey(this.survey._id)
            .then((data) => {
                this.finalizada = true;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
