// src/app/state/contacts.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loadContactsSuccess, loadContactsFailure, addContact, updateContact, deleteContact } from './contacts.actions';
import { Contact } from '../models/contact.model';

export interface State {
  contacts: Contact[];
  error: any;
}

export const initialState: State = {
  contacts: [],
  error: null
};

export const contactsReducer = createReducer(
  initialState,
  on(loadContactsSuccess, (state, { contacts }) => ({
    ...state,
    contacts
  })),
  on(loadContactsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(addContact, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact]
  })),
  on(updateContact, (state, { contact }) => ({
    ...state,
    contacts: state.contacts.map(c => (c.id === contact.id ? contact : c))
  })),
  on(deleteContact, (state, { contactId }) => ({
    ...state,
    contacts: state.contacts.filter(c => c.id !== contactId)
  }))
);
