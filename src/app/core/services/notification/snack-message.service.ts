import { Injectable } from '@angular/core';
import { SNACK_DATA } from 'src/app/models/notification';
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackMessageService {
  constructor(private snackbar: MatSnackBar) { }
  public show(snackData: SNACK_DATA) {
    this.snackbar.open(snackData?.message, snackData?.action || 'OK', {
      duration: snackData?.duration || 4000,
    });
  }
}
