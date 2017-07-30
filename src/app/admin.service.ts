import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const ADMIN_API_URL = 'http://www.whvapor.com';

@Injectable()
export class AdminService {

  public apiKey: string;

  constructor(
    private http: Http
  ) {

  }

  public getDepartments() {

    return this.http
      .get('/departments')
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public postAdminLogin(username: string, password: string): Observable<any> {

    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `username=${username}&password=${password}`;

    return this.http
      .post(ADMIN_API_URL + '/admin/login', body, { headers: headers })
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    console.error(error);
    return Observable.throw(error);
  }

}
