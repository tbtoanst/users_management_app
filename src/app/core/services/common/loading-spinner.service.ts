import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { LoadingSpinner } from 'src/app/shared/components';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private overlayRef = this.cdkOverlayCreate();
  private spinnerCount = 0;
  constructor(private overlay: Overlay) {}
  private cdkOverlayCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .bottom()
        .right(),
    });
  }
  public addQuene() {
    if (this.spinnerCount > 0) {
      this.spinnerCount++;
    } else {
      this.showSpinner();
      this.spinnerCount = 1;
    }
  }
  public removeQuene() {
    this.spinnerCount--;
    if (this.spinnerCount < 1) {
      this.stopSpinner();
    }
  }
  showSpinner() {
    this.overlayRef.attach(new ComponentPortal(LoadingSpinner));
  }

  stopSpinner() {
    this.overlayRef.detach();
  }
}
