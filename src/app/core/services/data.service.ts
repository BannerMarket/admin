import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../../assets/configs/urls';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  public get(url: string, params: object = {}): Observable<any> {
    return this.httpClient.get(
      Urls.ROOT + url + '?' + this.toGetParams(params),
      {headers: {accessToken: this.accessToken}})
      .pipe(catchError((err) => this.handleFailedResponse(err)))
      .pipe(map(this.handleSuccessfulResponse));
  }

  public post(url: string, body: object = {}): Observable<any> {
    return this.httpClient.post(Urls.ROOT + url, body, {headers: {accessToken: this.accessToken}})
      .pipe(catchError((err) => this.handleFailedResponse(err)))
      .pipe(map(this.handleSuccessfulResponse));
  }

  public put(url: string, body: object = {}): Observable<any> {
    return this.httpClient.put(Urls.ROOT + url, body, {headers: {accessToken: this.accessToken}})
      .pipe(catchError((err) => this.handleFailedResponse(err)))
      .pipe(map(this.handleSuccessfulResponse));
  }

  public delete(url: string, body: object = {}): Observable<any> {
    return this.httpClient.delete(Urls.ROOT + url, {...body, ...{headers: {accessToken: this.accessToken}}})
      .pipe(catchError((err) => this.handleFailedResponse(err)))
      .pipe(map(this.handleSuccessfulResponse));
  }

  private toGetParams(params: object): string {
    return Array.from(Object.keys(params))
      .reduce((res, key) => res + `${key}=${params[key]}&`, '');
  }

  private handleSuccessfulResponse(response: any): any {
    return response ? response['data'] : undefined;
  }

  private handleFailedResponse(err: any): Observable<any> {
    if (err && err.status === 401) {
      localStorage.removeItem('accessToken');
      this.router.navigateByUrl('/login');
    }
    throw new Error(err.error);
  }

  private get accessToken(): string {
    const local = localStorage.getItem('accessToken');
    return local ? local : '';
  }
}
