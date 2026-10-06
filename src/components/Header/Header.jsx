import React from 'react';
import './Header.css';

export default function Header({ totalContacts }) {
  return (
    <header className="header" role="banner">
      <div className="header__inner">
        {/* Brand */}
        <div className="header__brand">
          <div className="header__icon" aria-hidden="true" style={{ fontSize: '24px' }}>
            📇
          </div>
          <div className="header__text">
            <h1 className="header__title">Contact Cards</h1>
            <p className="header__subtitle">Create, manage and organize your contacts</p>
          </div>
        </div>

        <div className="header__spacer" />

        {/* Contact count */}
        <div className="header__stat" aria-label={`${totalContacts} total contacts`}>
          <span className="header__stat-number">{totalContacts}</span>
          <span className="header__stat-label">
            {totalContacts === 1 ? 'Contact' : 'Contacts'}
          </span>
        </div>
      </div>
    </header>
  );
}
