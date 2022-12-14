import { addNewUser, deleteUser, updateUser } from "../actions/user.actions";
import { initialUserState } from "../states/user.state";
import { createReducer, on } from '@ngrx/store'
import { v4 as uuidv4 } from 'uuid';
import { PROFILE } from "src/app/models/auth";

export const userReducers = createReducer(
    initialUserState,
    on(addNewUser, (entries , user) => {
        const entriesClone: PROFILE[] = JSON.parse(JSON.stringify(entries))
        entriesClone.push(user);
        console.log('add', entriesClone)
        return entriesClone
    }),
    on(deleteUser, (entries , user) => {
        const entriesClone: PROFILE[] = JSON.parse(JSON.stringify(entries))
        const found = entriesClone.find(e => e.userId == user.userId);
        if(found){
            entriesClone.splice(entriesClone.indexOf(found), 1)
        }
        return entriesClone
    }),
    on(updateUser, (entries , user) => {
        const entriesClone: PROFILE[] = JSON.parse(JSON.stringify(entries))
        const found = entriesClone.find(e => e.userId == user.userId);
        if(found){
            entriesClone[entriesClone.indexOf(found)] = JSON.parse(JSON.stringify(user))
        }
        return entriesClone
    }),
)