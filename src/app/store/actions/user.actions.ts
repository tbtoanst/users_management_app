import { Action } from "@ngrx/store";
import { PROFILE } from "src/app/models/auth";

export enum EUserActions {
    GetUsers = '[User] Get Users',
    GetUsersSuccess = '[User] Get Users Success',
    AddNewUser = '[User] Add New User',
    AddNewUserSuccess = '[User] Add New User Success',
}

export class GetUsers implements Action{
    public readonly type = EUserActions.GetUsers;
}

export class GetUsersSuccess implements Action{
    public readonly type = EUserActions.GetUsersSuccess;
    constructor(public payload: PROFILE[]){}
}

export class AddNewUser implements Action{
    public readonly type = EUserActions.AddNewUser;
    constructor(public payload: any){}
}

export class AddNewUserSuccess implements Action{
    public readonly type = EUserActions.AddNewUserSuccess;
    constructor(public payload: PROFILE[]){}
}

export type UserActions = GetUsers | GetUsersSuccess | AddNewUser | AddNewUserSuccess