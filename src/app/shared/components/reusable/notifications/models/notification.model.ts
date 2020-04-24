import {WithAutoId} from '../../../../../core/utils/withAutoId';

export enum AppNotificationType {
  error,
  success,
  message,
}

export class AppNotification extends WithAutoId {

  constructor(public type: AppNotificationType, public message: string) {
    super();
  }

}
