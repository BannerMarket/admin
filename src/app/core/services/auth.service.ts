import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DataService} from './data.service';
import {Urls} from '../../../assets/configs/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private dataService: DataService) { }

  public login(username: string, password: string): Observable<{accessToken: string}> {
    return this.dataService.post(Urls.LOGIN, {username, password});
  }

  public logout(): Observable<null> {
    localStorage.removeItem('accessToken');
    return new BehaviorSubject(null);
  }

  public register(username: string, password: string): Observable<null> {
    return this.dataService.post(Urls.REGISTER, {username, password});
  }
}
