import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  users$: Observable<PROFILE[]> 
  constructor(
    private userListService: UserListService,
    private dialog: MatDialog,
    private messageService: SnackMessageService,
    private _store: Store
  ) {
    this.users$ = _store.select(selectAllUsers);
  }

  async ngOnInit() {
    // this.userList = await this.userListService.getAllUsers();
    // this._store.dispatch(new GetUsers());
    console.log()
  }
  async createNewUser() {
    try {
      const { success, userData } = await this.openUserModal();
      // if (success) {
      //   this.userList.push(userData);
      // }
    } catch (error: any) {
      this.messageService.show({
        message: error?.message || 'An error occoured when creating new user',
      });
    }
  }

  async updateUser(user: PROFILE) {
    try {
      const { success, userData } = await this.openUserModal(user);
      if (success) {
        // const userIndex = this.userList.findIndex(
        //   (usr) => usr?.id === user?.id
        // );
        // if (userIndex >= 0) {
        //   this.userList[userIndex] = userData;
        //   this.messageService.show({
        //     message: `User (${userData?.fullName}) has been updated successfully`,
        //     duration: 4000,
        //   });
        // }
      }
    } catch (error: any) {
      this.messageService.show({
        message: error?.message || 'An error occoured when updating  user',
      });
    }
  }
  async deleteUser(userData: PROFILE) {
    // const { success } = await this.userListService.deleteUser(userData?.id);
    // if (success) {
    //   const userIndex = this.userList.findIndex(
    //     (usr) => usr.id === userData?.id
    //   );
    //   if (userIndex >= 0) {
    //     this.userList.splice(userIndex, 1);
    //     this.messageService.show({
    //       message: `User (${userData?.fullName}) has been removed successfully`,
    //     });
    //   }
    // }

    this._store.dispatch(deleteUser(userData));
  }
  // OPEN MODAL WITH SOME CONFIGRATION
  private async openUserModal(user?: PROFILE) {
    const userDialog = this.dialog.open(UserModal, {
      width: '450px',
      maxWidth: '100%',
      data: user,
      disableClose: true,
    });
    return await userDialog.afterClosed().toPromise();
  }
}
