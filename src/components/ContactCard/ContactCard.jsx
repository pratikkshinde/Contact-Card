import React from 'react';
import { generateInitials } from '../../utils/contactUtils';
import './ContactCard.css';

// Deterministic avatar color from name
const AVATAR_COLORS = [
  ['#6366f1', '#4f46e5'], // indigo
  ['#3b82f6', '#2563eb'], // blue
  ['#8b5cf6', '#7c3aed'], // violet
  ['#10b981', '#059669'], // emerald
  ['#f59e0b', '#d97706'], // amber
  ['#ef4444', '#dc2626'], // red
  ['#06b6d4', '#0891b2'], // cyan
  ['#ec4899', '#db2777'], // pink
];

function getAvatarColor(name) {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// Displays a single contact
export default function ContactCard({ contact, onEdit, onDelete }) {
  const initials = generateInitials(contact.name);
  const [bg, bgDark] = getAvatarColor(contact.name);

  return (
    <article
      className="contact-card"
      style={{ '--card-accent': bg }}
      aria-label={`Contact card for ${contact.name}`}
    >
      {/* Header */}
      <div className="contact-card__header">
        <div
          className="avatar"
          style={{ background: `linear-gradient(135deg, ${bg}, ${bgDark})` }}
          aria-hidden="true"
        >
          {initials}
        </div>

        <div className="contact-card__info">
          <h2 className="contact-card__name" title={contact.name}>
            {contact.name}
          </h2>

          {contact.jobTitle && (
            <p className="contact-card__job">{contact.jobTitle}</p>
          )}

          {contact.company && (
            <span className="contact-card__company" title={contact.company}>
              🏢 {contact.company}
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="contact-card__details">
        <div className="contact-detail">
          <span className="contact-detail__icon" aria-hidden="true">
            📧
          </span>
          <span className="contact-detail__value">
            <a href={`mailto:${contact.email}`} aria-label={`Send email to ${contact.name}`}>
              {contact.email}
            </a>
          </span>
        </div>

        <div className="contact-detail">
          <span className="contact-detail__icon" aria-hidden="true">
            📞
          </span>
          <span className="contact-detail__value">
            <a href={`tel:${contact.phone}`} aria-label={`Call ${contact.name}`}>
              {contact.phone}
            </a>
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="contact-card__actions">
        <button
          type="button"
          className="btn btn--sm btn--ghost"
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${contact.name}`}
        >
          ✏️ Edit
        </button>
        <button
          type="button"
          className="btn btn--sm btn--danger"
          onClick={() => onDelete(contact)}
          aria-label={`Delete ${contact.name}`}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
}
