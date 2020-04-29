import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../../../assets/configs/urls';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public get(url: string, params: object = {}): Observable<any> {
    return this.httpClient.get(Urls.ROOT + url + '?' + this.toGetParams(params));
  }

  public post(url: string, body: object = {}) {
    return this.httpClient.post(Urls.ROOT + url, body);
  }

  public put(url: string, body: object = {}) {
    return this.httpClient.put(Urls.ROOT + url, body);
  }

  public delete(url: string) {
    return this.httpClient.delete(Urls.ROOT + url);
  }

  private toGetParams(params: object): string {
    return Array.from(Object.keys(params))
      .reduce((res, key) => res + `${key}=${params[key]}&`, '');
  }
}
