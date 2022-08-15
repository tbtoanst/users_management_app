import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { lastValueFrom, Observable } from 'rxjs';
import { UserListService } from 'src/app/core/services/auth';
import { SnackMessageService } from 'src/app/core/services/notification';
import { PROFILE } from 'src/app/models/auth';
import { deleteUser } from 'src/app/store/actions/user.actions';
import { selectAllUsers } from 'src/app/store/selectors/user.selectors';
import { UserModal } from './components';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  // userList!: PROFILE[];
  users$: Observable<PROFILE[]>;
  userCount = 0;
  constructor(
    private userListService: UserListService,
    private dialog: MatDialog,
    private messageService: SnackMessageService,
    private _store: Store
  ) {
    this.users$ = _store.select(selectAllUsers);
  }

  async ngOnInit() {
    this.users$.forEach((users) => this.userCount = users.length)
  }
  async createNewUser() {
    try {
      const { success, data } = await this.openUserModal();
      if (success) {
        // if (userIndex >= 0) {
          this.messageService.show({
            message: `User ${data?.email} has been added successfully`,
            duration: 4000,
          });
      }
    } catch (error: any) {
      this.messageService.show({
        message: error?.message || 'An error occoured when creating new user',
      });
    }
  }

  async updateUser(user: PROFILE) {
    try {
      const { success, data } = await this.openUserModal(user);
      if (success) {
        this.messageService.show({
          message: `User ${data?.email} has been updated successfully`,
          duration: 4000,
        });
      }
    } catch (error: any) {
      this.messageService.show({
        message: error?.message || 'An error occoured when updating  user',
      });
    }
  }
  async deleteUser(userData: PROFILE) {
    let userIndex = -1;
    this.users$.forEach((users) => {
      userIndex = users.findIndex(user => user.id == userData?.id)
    });
    if (userIndex >= 0) {
      this._store.dispatch(deleteUser(userData));
    this.messageService.show({
            message: `User ${userData?.fullName} has been removed successfully`,
          });
    } else { 
      this.messageService.show({
        message: `Can not found ${userData?.fullName}`,
      });
    }
  }
  // OPEN MODAL WITH SOME CONFIGRATION
  private async openUserModal(user?: PROFILE) {
    const userDialog = this.dialog.open(UserModal, {
      width: '450px',
      maxWidth: '100%',
      data: user,
      disableClose: true,
    });
    return await lastValueFrom(userDialog.afterClosed());
  }
}
