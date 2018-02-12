import { Component, OnInit } from '@angular/core';

import { SurveyLiveService } from '../survey-live/survey-live.service';

@Component({
    selector: 'app-survey-finished',
    templateUrl: './survey-finished.html',
    styleUrls: [ './survey-finished.scss' ]
})
export class SurveyFinishedComponent implements OnInit {

    survey: any;

    running = false;

    constructor(
        private surveyLiveService: SurveyLiveService
    ) {

    }

    ngOnInit() {
        this.surveyLiveService.getSurvey()
        .then((survey: any) => {
            if (survey.length !== 0) {
                if (survey[0].status === 'CLOSED') {
                    this.survey = survey[0];
                } else {
                    this.running = true;
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

}
