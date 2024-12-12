import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactsState } from './contacts.state';

export const selectContactsState = createFeatureSelector<ContactsState>('contacts');

export const selectContacts = createSelector(
  selectContactsState,
  (state: ContactsState) => state.contacts
);

export const selectLoading = createSelector(
  selectContactsState,
  (state: ContactsState) => state.loading
);

export const selectError = createSelector(
  selectContactsState,
  (state: ContactsState) => state.error
);
