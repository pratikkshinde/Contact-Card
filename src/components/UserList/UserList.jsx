import React, { useState } from 'react';
import ContactCard from '../ContactCard/ContactCard';
import EmptyState from '../EmptyState/EmptyState';
import { filterContacts } from '../../utils/contactUtils';
import './UserList.css';

// Renders the search bar, stats, and the contact card grid
export default function UserList({ contacts, onEdit, onDelete }) {
  const [query, setQuery] = useState('');

  const filtered = filterContacts(contacts, query);
  const hasContacts = contacts.length > 0;
  const hasResults  = filtered.length > 0;

  return (
    <section className="user-list" aria-label="Your contacts">
      {/* Toolbar */}
      <div className="user-list__toolbar">
        <h2 className="user-list__heading">Your Contacts</h2>

        {/* Search */}
        {hasContacts && (
          <div className="search-wrapper" role="search">
            <span className="search-icon" aria-hidden="true" style={{ fontSize: '14px' }}>
              🔍
            </span>
            <input
              id="search-contacts"
              type="search"
              className="search-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search contacts…"
              aria-label="Search contacts by name, email or company"
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                ❌
              </button>
            )}
          </div>
        )}

        {/* Stats */}
        {hasContacts && (
          <div className="user-list__stats" aria-live="polite">
            <strong>{hasResults ? filtered.length : 0}</strong>
            {query
              ? ` of ${contacts.length} contact${contacts.length !== 1 ? 's' : ''}`
              : ` contact${contacts.length !== 1 ? 's' : ''}`}
          </div>
        )}
      </div>

      {/* Content */}
      {!hasContacts && (
        <EmptyState type="empty" />
      )}

      {hasContacts && !hasResults && (
        <EmptyState type="no-results" query={query} />
      )}

      {hasResults && (
        <ul className="contacts-grid" aria-label="Contact cards">
          {filtered.map(contact => (
            <li key={contact.id}>
              <ContactCard
                contact={contact}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
