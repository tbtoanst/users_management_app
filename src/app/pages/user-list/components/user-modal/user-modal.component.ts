import { Store } from '@ngrx/store';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserListService } from 'src/app/core/services/auth';
import { PROFILE } from 'src/app/models/auth';
import { AddNewUser } from 'src/app/store/actions/user.actions';
import { IAppState } from 'src/app/store/states/app.state';


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  constructor(
    private userListService: UserListService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    private _store: Store<IAppState>,
    @Inject(MAT_DIALOG_DATA) public data: PROFILE
  ) {
  }
  // async save(formData: any) {
  //   const { success, user } = this.data
  //     ? await this.userListService.updateUser({
  //         ...this.data,
  //         fullName: formData?.fullName,
  //         role: formData?.role,
  //       })
  //     : await this.userListService.addNewUser(formData);
  //   if (success) {
  //     this.dialogRef.close({ success: true, userData: user });
  //   }
  // }
  save(formData: any) {
    this._store.dispatch(new AddNewUser(formData))
  }
  ngOnInit(): void {}

}
