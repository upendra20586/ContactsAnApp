// src/app/state/contacts.actions.ts
import { createAction, props } from '@ngrx/store';
import { Contact } from '../models/contact.model';

export const loadContacts = createAction('[Contact] Load Contacts');

export const loadContactsSuccess = createAction(
  '[Contact] Load Contacts Success',
  props<{ contacts: Contact[] }>()
);

export const loadContactsFailure = createAction(
  '[Contact] Load Contacts Failure',
  props<{ error: any }>()
);

export const addContact = createAction(
  '[Contact] Add Contact',
  props<{ contact: Contact }>()
);

export const updateContact = createAction(
  '[Contact] Update Contact',
  props<{ contact: Contact }>()
);

export const deleteContact = createAction(
  '[Contact] Delete Contact',
  props<{ contactId: number }>()
);
