import React, { useState, useEffect } from 'react';
import { validateContact } from '../../utils/validation';
import { EMPTY_FORM } from '../../utils/contactUtils';
import './ContactForm.css';

// Small inline validation error component
function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <p className="form-error" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </p>
  );
}

// Controlled form for adding or editing a contact
export default function ContactForm({
  initialData = EMPTY_FORM,
  onSubmit,
  onCancel,
  submitLabel = 'Add Contact',
  duplicateError = null,
}) {
  const [form, setForm]     = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sync form when initialData changes (e.g. opening a different contact in edit mode)
  useEffect(() => {
    setForm(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error as soon as user starts correcting the field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    // Validate on blur
    const fieldErrors = validateContact({ ...form });
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] ?? null }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true };
    setTouched(allTouched);

    const validationErrors = validateContact(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Move focus to first errored field
      const firstField = Object.keys(validationErrors)[0];
      document.getElementById(`field-${firstField}`)?.focus();
      return;
    }

    onSubmit(form);
  }

  function handleClear() {
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
  }

  const inputClass = (field) =>
    `form-input${touched[field] && errors[field] ? ' form-input--error' : ''}`;

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
    >
      {/* Required fields */}
      <p className="contact-form__section-label">Required Information</p>

      <div className="form-group">
        <label htmlFor="field-name" className="form-label form-label--required">
          Full Name
        </label>
        <input
          id="field-name"
          name="name"
          type="text"
          className={inputClass('name')}
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. John Doe"
          autoComplete="name"
          aria-required="true"
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={errors.name ? 'err-name' : undefined}
        />
        {touched.name && <ErrorMessage message={errors.name} />}
      </div>

      <div className="contact-form__row" style={{ marginTop: 'var(--space-4)' }}>
        <div className="form-group">
          <label htmlFor="field-email" className="form-label form-label--required">
            Email Address
          </label>
          <input
            id="field-email"
            name="email"
            type="email"
            className={inputClass('email')}
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={touched.email && !!errors.email}
          />
          {touched.email && <ErrorMessage message={errors.email} />}
          {duplicateError && <ErrorMessage message={duplicateError} />}
        </div>

        <div className="form-group">
          <label htmlFor="field-phone" className="form-label form-label--required">
            Phone Number
          </label>
          <input
            id="field-phone"
            name="phone"
            type="tel"
            className={inputClass('phone')}
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+91 9876543210"
            autoComplete="tel"
            aria-required="true"
            aria-invalid={touched.phone && !!errors.phone}
          />
          {touched.phone && <ErrorMessage message={errors.phone} />}
        </div>
      </div>

      {/* Optional fields */}
      <p className="contact-form__section-label" style={{ marginTop: 'var(--space-6)' }}>
        Optional Details
      </p>

      <div className="contact-form__row">
        <div className="form-group">
          <label htmlFor="field-company" className="form-label">
            Company
            <span className="form-label--optional">(optional)</span>
          </label>
          <input
            id="field-company"
            name="company"
            type="text"
            className="form-input"
            value={form.company}
            onChange={handleChange}
            placeholder="e.g. Acme Corp"
            autoComplete="organization"
          />
        </div>

        <div className="form-group">
          <label htmlFor="field-jobTitle" className="form-label">
            Job Title
            <span className="form-label--optional">(optional)</span>
          </label>
          <input
            id="field-jobTitle"
            name="jobTitle"
            type="text"
            className="form-input"
            value={form.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            autoComplete="organization-title"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="contact-form__actions">
        {onCancel && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        {!onCancel && (
          <button type="button" className="btn btn--ghost" onClick={handleClear}>
            Clear
          </button>
        )}
        <button type="submit" className="btn btn--primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
