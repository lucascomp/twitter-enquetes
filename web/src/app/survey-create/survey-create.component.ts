import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SurveyCreateService } from './survey-create.service';
import { SurveyLiveService } from '../survey-live/survey-live.service';

@Component({
    selector: 'app-survey-create',
    templateUrl: './survey-create.html',
    styleUrls: [ './survey-create.scss' ]
})
export class SurveyCreateComponent implements OnInit {

    name: string;
    description: string;
    option1: string;
    option2: string;
    option3: string;

    showSucessOnCreate = false;
    showForm = false;
    formDirty = false;

    constructor(
        private router: Router,
        private surveyCreateService: SurveyCreateService,
        private surveyLiveService: SurveyLiveService
    ) {}

    ngOnInit() {
        this.surveyLiveService.getSurvey()
            .then((survey: any) => {
                if (survey.length === 0) {
                    this.showForm = true;
                } else {
                    if (survey[0].status === 'OPEN') {
                        this.showSucessOnCreate = true;
                    } else {
                        this.showForm = true;
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    openSurvey() {
        if (!this.formularioValido) {
            this.formDirty = true;
        }
        const survey = {
            name: this.name,
            description: this.description,
            options: [
                {
                    description: this.option1
                },
                {
                    description: this.option2
                }
            ]
        };
        if (this.option3) {
            survey.options.push({
                description: this.option3
            });
        }
        this.surveyCreateService.createSurvey(survey)
            .then(data => {
                this.showSucessOnCreate = true;
            })
            .catch(error => {
                console.log(error);
            });
    }

    get formularioValido() {
        return this.name && this.description && this.option1 && this.option2;
    }

}
