// Pure validation functions — no React dependencies.

export function validateName(value) {
  const v = value?.trim() ?? '';
  if (!v) return 'Full name is required.';
  if (v.length < 2) return 'Name must be at least 2 characters.';
  if (v.length > 80) return 'Name is too long (max 80 characters).';
  return null;
}

export function validateEmail(value) {
  const v = value?.trim() ?? '';
  if (!v) return 'Email address is required.';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!re.test(v)) return 'Please enter a valid email address.';
  return null;
}

export function validatePhone(value) {
  const v = value?.trim() ?? '';
  if (!v) return 'Phone number is required.';
  const digits = v.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) {
    return 'Please enter a valid phone number (7–15 digits).';
  }
  return null;
}

export function validateCompany(_value) {
  // Optional field — always valid
  return null;
}

export function validateJobTitle(_value) {
  // Optional field — always valid
  return null;
}

// Validate an entire contact form object
export function validateContact(data) {
  const errors = {};
  const nameErr  = validateName(data.name);
  const emailErr = validateEmail(data.email);
  const phoneErr = validatePhone(data.phone);

  if (nameErr)  errors.name  = nameErr;
  if (emailErr) errors.email = emailErr;
  if (phoneErr) errors.phone = phoneErr;

  return errors;
}
