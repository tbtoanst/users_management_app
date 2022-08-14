import { Store } from '@ngrx/store';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserListService } from 'src/app/core/services/auth';
import { PROFILE } from 'src/app/models/auth';
import { addNewUser, updateUser } from 'src/app/store/actions/user.actions';



@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  constructor(
    private userListService: UserListService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    private _store: Store,
    @Inject(MAT_DIALOG_DATA) public data: PROFILE
  ) {
  }
  save(formData: any) {
    this.data ? this._store.dispatch(updateUser({
              ...this.data,
              fullName: formData?.fullName,
              role: formData?.role,
            }))
    : this._store.dispatch(addNewUser(formData));
    this.dialogRef.close({ success: true });
  }
  ngOnInit(): void {
    console.log()
  }

}
