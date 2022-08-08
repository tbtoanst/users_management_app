import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserListService } from 'src/app/core/services/auth';
import { PROFILE } from 'src/app/models/auth';


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {

  constructor(
    private userListService: UserListService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PROFILE
  ) {}
  async save(formData: any) {
    const { success, user } = this.data
      ? await this.userListService.updateUser({
          ...this.data,
          fullName: formData?.fullName,
          role: formData?.role,
        })
      : await this.userListService.addNewUser(formData);
    if (success) {
      this.dialogRef.close({ success: true, userData: user });
    }
  }
  ngOnInit(): void {}

}
