import React from 'react';
import './EmptyState.css';

function ContactsIllustration() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
  );
}

function SearchIllustration() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      <line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  );
}

/**
 * EmptyState — shown when there are no contacts or no search results.
 *
 * Props:
 *   type     {string}   - 'empty' | 'no-results'
 *   query    {string}   - The current search query (for no-results message).
 *   onAction {function} - Called when the CTA button is clicked.
 */
export default function EmptyState({ type = 'empty', query = '', onAction }) {
  if (type === 'no-results') {
    return (
      <div className="empty-state" role="status" aria-live="polite">
        <div className="empty-state__illustration">
          <SearchIllustration />
        </div>
        <h2 className="empty-state__title">No contacts found</h2>
        <p className="empty-state__no-results">
          No results for <strong>"{query}"</strong>.<br />
          Try a different name, email or company.
        </p>
      </div>
    );
  }

  return (
    <div className="empty-state" role="status">
      <div className="empty-state__illustration">
        <ContactsIllustration />
      </div>
      <h2 className="empty-state__title">No contacts yet</h2>
      <p className="empty-state__description">
        Start building your contact list by adding your first contact using the form above.
      </p>
      {onAction && (
        <button type="button" className="btn btn--primary" onClick={onAction}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Your First Contact
        </button>
      )}
    </div>
  );
}
