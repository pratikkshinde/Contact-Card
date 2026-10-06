import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ContactForm from './components/ContactForm/ContactForm';
import UserList from './components/UserList/UserList';
import Modal from './components/Modal/Modal';
import { isDuplicateEmail } from './utils/contactUtils';

// Main application component
export default function App() {
  const [contacts, setContacts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [editingContact, setEditingContact] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [duplicateError, setDuplicateError] = useState(null);

  // Add new contact
  const handleAdd = (formData) => {
    if (isDuplicateEmail(contacts, formData.email)) {
      setDuplicateError('A contact with this email already exists.');
      return;
    }
    setDuplicateError(null);
    const newContact = {
      ...formData,
      id: Date.now().toString(), // Simpler ID generation
      createdAt: new Date().toISOString()
    };
    setContacts(prev => [newContact, ...prev]);
    setIsFormOpen(false);
    alert('Contact added successfully!'); // Simpler notification
  };

  // Edit existing contact
  const handleEditOpen = (contact) => {
    setEditingContact(contact);
  };

  const handleEditSave = (formData) => {
    if (isDuplicateEmail(contacts, formData.email, editingContact.id)) {
      setDuplicateError('Another contact with this email already exists.');
      return;
    }
    setDuplicateError(null);
    setContacts(prev => prev.map(c => 
      c.id === editingContact.id ? { ...c, ...formData } : c
    ));
    setEditingContact(null);
    alert('Contact updated!');
  };

  const handleEditClose = () => {
    setEditingContact(null);
    setDuplicateError(null);
  };

  // Delete contact
  const handleDeletePrompt = (contact) => {
    setDeleteTarget(contact);
  };

  const handleDeleteConfirm = () => {
    setContacts(prev => prev.filter(c => c.id !== deleteTarget.id));
    setDeleteTarget(null);
    alert('Contact deleted.');
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  return (
    <>
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      <Header totalContacts={contacts.length} />

      <main className="home" id="main-content">
        <section className="home__add-section" aria-label="Add new contact">
          <button
            type="button"
            className="home__add-header"
            onClick={() => setIsFormOpen(open => !open)}
            aria-expanded={isFormOpen}
            aria-controls="add-contact-form"
          >
            <div className="home__add-header-left">
              <div className="home__add-icon" aria-hidden="true">
                ➕
              </div>
              <div>
                <p className="home__add-title">Add New Contact</p>
                <p className="home__add-subtitle">Fill in the details below</p>
              </div>
            </div>
            <span
              className={`home__add-chevron${isFormOpen ? ' home__add-chevron--open' : ''}`}
              aria-hidden="true"
            >
              ⬇️
            </span>
          </button>

          {isFormOpen && (
            <div id="add-contact-form" className="home__add-body">
              <ContactForm
                onSubmit={handleAdd}
                submitLabel="Add Contact"
                duplicateError={duplicateError}
              />
            </div>
          )}
        </section>

        <section className="home__contacts-section" aria-label="Contact list">
          <UserList
            contacts={contacts}
            loading={false}
            onEdit={handleEditOpen}
            onDelete={handleDeletePrompt}
          />
        </section>

        <Modal
          isOpen={!!editingContact}
          onClose={handleEditClose}
          title="Edit Contact"
        >
          {editingContact && (
            <ContactForm
              initialData={{
                name:     editingContact.name,
                email:    editingContact.email,
                phone:    editingContact.phone,
                company:  editingContact.company  ?? '',
                jobTitle: editingContact.jobTitle ?? '',
              }}
              onSubmit={handleEditSave}
              onCancel={handleEditClose}
              submitLabel="Save Changes"
              duplicateError={duplicateError}
            />
          )}
        </Modal>

        {deleteTarget && (
          <div
            className="confirm-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Confirm delete"
            onClick={e => e.target === e.currentTarget && handleDeleteCancel()}
          >
            <div className="confirm-box">
              <div className="confirm-box__icon" aria-hidden="true">
                🗑️
              </div>
              <h2 className="confirm-box__title">Delete Contact?</h2>
              <p className="confirm-box__body">
                Are you sure you want to delete{' '}
                <strong>{deleteTarget.name}</strong>? This action cannot be undone.
              </p>
              <div className="confirm-box__actions">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={handleDeleteCancel}
                  autoFocus
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={handleDeleteConfirm}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
