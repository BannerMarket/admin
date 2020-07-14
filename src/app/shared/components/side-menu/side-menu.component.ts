import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {NotificationsService} from '../reusable/notifications/notifications.service';
import {take} from 'rxjs/operators';
import {AppNotificationType} from '../reusable/notifications/models/notification.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private notificationsService: NotificationsService) { }

  ngOnInit() { }

  public logout(): void {
    this.authService.logout()
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['login']),
        () => this.notificationsService.notify(AppNotificationType.error, 'Something went wrong'));
  }
}
