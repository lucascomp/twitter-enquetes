import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SurveyCreateService {

    constructor(
        private http: HttpClient
    ) {}

    createSurvey(survey) {
        return new Promise((resolve, reject) => {
            this.http.post('http://localhost:3000/survey/create/', survey, httpOptions)
                .subscribe(
                    data => resolve(data),
                    error => reject(error)
                );
        });
    }

}
