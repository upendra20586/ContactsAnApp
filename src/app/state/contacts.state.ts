import { Contact } from '../models/contact.model';

export interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

export const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};
