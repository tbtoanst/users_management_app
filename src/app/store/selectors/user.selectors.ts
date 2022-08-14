import { PROFILE } from "src/app/models/auth";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectAllUsers = createSelector(
    createFeatureSelector('users'),
    (state: PROFILE[]) => {
        return state
    }
)
