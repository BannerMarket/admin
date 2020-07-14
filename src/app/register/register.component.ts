import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from '../shared/components/reusable/notifications/notifications.service';
import {AuthService} from '../core/services/auth.service';
import {take} from 'rxjs/operators';
import {AppNotificationType} from '../shared/components/reusable/notifications/models/notification.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public register(): void {
    if (this.form.valid) {
      const {username, password} = this.form.getRawValue();
      this.authService.register(username, password)
        .pipe(take(1))
        .subscribe(() => {
          this.notificationsService.notify(AppNotificationType.success, 'Registered');
          this.router.navigateByUrl('/');
        }, () => {
          this.notificationsService.notify(AppNotificationType.error, 'Could not register');
        });
    }
  }
}
