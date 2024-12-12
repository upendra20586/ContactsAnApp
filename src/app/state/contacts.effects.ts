// src/app/state/contacts.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { loadContacts, loadContactsSuccess, loadContactsFailure } from './contacts.actions';
import { switchMap, catchError, map } from 'rxjs/operators';

@Injectable()
export class ContactEffects {
  loadContacts$ = createEffect(() => this.actions$.pipe(
    ofType(loadContacts),
    switchMap(() =>
      this.contactService.getContacts().pipe(
        map(contacts => loadContactsSuccess({ contacts })),
        catchError(async (error) => loadContactsFailure({ error }))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
}
