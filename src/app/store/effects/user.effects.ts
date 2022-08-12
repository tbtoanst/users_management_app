import { createEffect, Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { EUserActions, GetUsers } from '../actions/user.actions';
import { IAppState } from '../states/app.state';

export class UserEffects{
    constructor(
        private _actions$: Actions,
        private _store: Store<IAppState>
    ) { }
    getUser$ = createEffect(() => {
        return this._actions$.pipe(
            ofType<GetUsers>(EUserActions.GetUsers),
        );
      });
}