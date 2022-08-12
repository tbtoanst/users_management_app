import { EUserActions, UserActions } from "../actions/user.actions";
import { initialUserState, IUserState } from "../states/user.state";

export const userReducers = (
    state = initialUserState,
    action: UserActions)
    : IUserState => {
    switch (action.type) {
        case EUserActions.GetUsersSuccess: {
            return {
                ...state,
                users: action.payload
            }
        }
        case EUserActions.AddNewUser: {
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        }
        case EUserActions.AddNewUserSuccess: {
            return {
                ...state,
                users: action.payload
            }
        }
        default:
            return state;
    }
    }