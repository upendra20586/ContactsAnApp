import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadContacts, deleteContact } from '../state/contacts.actions';
import { selectContacts } from '../state/contacts.selectors';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss'],
})
export class ContactTableComponent implements OnInit {
  contacts$: Observable<Contact[]> = this.store.select(selectContacts);
  showForm: boolean = false;
  selectedContact: Contact | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.store.dispatch(loadContacts());
  }

  onNewContact(): void {
    this.selectedContact = null;
    this.showForm = true;
  }

  onEdit(contact: Contact): void {
    this.selectedContact = { ...contact };
    this.showForm = true;
  }

  onDelete(contactId: number): void {
    this.store.dispatch(deleteContact({ contactId: contactId }));
  }

  onFormClose(): void {
    this.showForm = false;
    this.selectedContact = null; 
    this.loadContacts();
  }
}
