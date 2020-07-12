import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {DataService} from './data.service';
import {Urls} from '../../../assets/configs/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  public login(username: string, password: string): Observable<null> {
    return this.dataService.get(Urls.LOGIN, {username, password});
  }
}
