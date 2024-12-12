import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Contact } from '../models/contact.model';
import { addContact, updateContact } from '../state/contacts.actions';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnChanges {
  @Input() contact: Contact | null = null;
  @Output() formClosed = new EventEmitter<void>();
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.contactForm = this.fb.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && !changes['contact'].firstChange) {
      this.initializeForm();
    }
  }

  initializeForm(): void {
    if (this.contact) {
      this.contactForm.reset(); 
      this.contactForm.patchValue(this.contact); 
    } else {
      this.contactForm.reset();
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const contactData: Contact = this.contactForm.value;
      if (this.contact) {
        this.store.dispatch(updateContact({ contact: { ...contactData, id: this.contact.id } }));
      } else {
        this.store.dispatch(addContact({ contact: { ...contactData, id: 0 } }));
      }
      this.formClosed.emit(); 
    }
  }

  closeForm(): void {
    this.formClosed.emit();
  }
}
