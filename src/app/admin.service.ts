import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const ADMIN_API_URL = environment.adminApiUrl;

@Injectable()
export class AdminService {

  public apiKey: string;

  constructor(
    private http: Http
  ) {

  }

  public getBlogPosts() {

    return this.http
      .get(ADMIN_API_URL + '/blogs')
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getBlogPost( id: any) {

    return this.http
      .get(ADMIN_API_URL + '/blog/' + id)
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

  public postNewBlog(title: string, author: string, body: string, image_url: string): Observable<any> {

    const authToken = 'bearer ' + this.apiKey;
    const headers = new Headers({ 'Authorization': authToken });
    const req_body = {
      title: title,
      author: author,
      body: body,
      image_url: image_url
    };

    return this.http
      .post(ADMIN_API_URL + '/admin/blog', req_body, { headers: headers })
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public updateBlog(blogId: string, title: string, author: string, body: string, image_url: string): Observable<any> {

    const authToken = 'bearer ' + this.apiKey;
    const headers = new Headers({ 'Authorization': authToken });
    const req_body = {
      title: title,
      author: author,
      body: body,
      image_url: image_url
    };

    return this.http
      .put(ADMIN_API_URL + '/admin/blog/' + blogId , req_body, { headers: headers })
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteBlog(blogId: string): Observable<any> {

    const authToken = 'bearer ' + this.apiKey;
    const headers = new Headers({ 'Authorization': authToken });

    return this.http
      .delete(ADMIN_API_URL + '/admin/blog/' + blogId , { headers: headers })
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getHomeImages() {
    return this.http
      .get(ADMIN_API_URL + '/images')
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public updateHomeImage(id: string, title: string, image_url: string): Observable<any> {

    const authToken = 'bearer ' + this.apiKey;
    const headers = new Headers({ 'Authorization': authToken });
    const req_body = {
      title: title,
      image_url: image_url
    };

    return this.http
      .put(ADMIN_API_URL + '/admin/image/' + id , req_body, { headers: headers })
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
