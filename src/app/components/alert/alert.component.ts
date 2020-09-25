import { Component, ViewChild, Input, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
      selector: 'alert',
      templateUrl: 'alert.component.html',
      styleUrls: ['alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
      @ViewChild('alertModal', { static: true }) public alertModal: ModalComponent;
      @Input() public data: AlertComponent.Parameters;

      public onClosed = new EventEmitter<number>();
      
      private selectedIndex: number = -1;

      constructor() { }

      public ngOnInit(): void {
            this.alertModal.closeButton = false;
            this.alertModal.outsideClickClose = false;

            this.alertModal.onClosed.subscribe(() => {
                  this.onClosed.emit(this.selectedIndex);
            })
      }

      public show(data: AlertComponent.Parameters): void {
            if (!data) {
                  return;
            }

            if (!data.buttons || data.buttons.length == 0) {
                  data.buttons = ['OK'];
            }

            this.data = data;

            this.alertModal.open();
      }

      public onOperationClick(index): void {
            this.selectedIndex = index;
            this.alertModal.close();
      }

      ngOnDestroy(): void {
            this.alertModal.onClosed.unsubscribe();
            this.onClosed.unsubscribe();
      }
}
export namespace AlertComponent {
      export interface Parameters {
            title?: string;
            description?: string;
            buttons?: string[];
            parentElement?: Element;
      }
}