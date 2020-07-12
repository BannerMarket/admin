import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/services/auth.service';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NotificationsService} from '../shared/components/reusable/notifications/notifications.service';
import {AppNotificationType} from '../shared/components/reusable/notifications/models/notification.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public login(): void {
    if (this.form.valid) {
      const {username, password} = this.form.getRawValue();
      this.authService.login(username, password)
        .pipe(take(1))
        .subscribe(() => {
          this.authService.isLoggedIn.next(true);
          this.router.navigateByUrl('/');
        }, () => {
          this.notificationsService.notify(AppNotificationType.error, 'Can\'t log in');
        });
    }
  }
}
