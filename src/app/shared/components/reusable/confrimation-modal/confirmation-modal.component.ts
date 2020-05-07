import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Modal} from '../../../models/modal.model';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit, Modal {

  @ViewChild(ModalComponent) modal?: ModalComponent;

  @Input() title = '';
  @Input() description = '';

  private onConfirmation: any;

  constructor() { }

  ngOnInit() { }

  public close($event: Event): void {
    if (this.modal) {
      this.modal.close($event);
    }
  }

  public open(onConfirmation: any): void {
    if (this.modal) {
      this.onConfirmation = onConfirmation;
      this.modal.open();
    }
  }

  public onConfirm($event: MouseEvent) {
    this.close($event);

    if (typeof this.onConfirmation === 'function') {
      this.onConfirmation();
    }
  }
}
