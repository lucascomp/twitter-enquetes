import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as io from 'socket.io-client';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SurveyLiveService {

    socket: any;

    constructor(
        private http: HttpClient
    ) {
        this.socket = io.connect('http://localhost:3000/');
    }

    getSurvey() {
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3000/survey/all/', httpOptions)
                .subscribe(
                    data => resolve(data),
                    error => reject(error)
                );
        });
    }

    finishSurvey(idSurvey) {
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3000/survey/close/' + idSurvey, httpOptions)
            .subscribe(
                data => resolve(data),
                error => reject(error)
            );
        });
    }

    cancelSurvey(idSurvey) {
        return new Promise((resolve, reject) => {
            this.http.delete('http://localhost:3000/survey/' + idSurvey, httpOptions)
                .subscribe(
                    data => resolve(data),
                    error => reject(error)
                );
        });
    }

    followSurvey(callback) {
        this.socket.on('survey:update', (survey) => {
            callback(survey);
        });
    }

    unfollowSurvey(callback) {
        this.socket.removeAllListeners('survey:update');
    }

}
