import { createAction, props } from "@ngrx/store";
import { PROFILE } from "src/app/models/auth";

export const addNewUser = createAction('[User] Add New User', props<PROFILE>());
export const deleteUser = createAction('[User] Delete User', props<PROFILE>());
export const updateUser = createAction('[User] Update User', props<PROFILE>());


