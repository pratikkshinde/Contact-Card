// Pure helper functions for contact data

// Generate initials from a full name ("John Doe" -> "JD")
export function generateInitials(name) {
  if (!name || !name.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Generate a unique contact ID
export function generateContactId() {
  return `contact_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// Filter contacts by a search query (name, email, company, jobTitle)
export function filterContacts(contacts, query) {
  if (!query || !query.trim()) return contacts;
  const q = query.trim().toLowerCase();
  return contacts.filter(
    (c) =>
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.company?.toLowerCase().includes(q) ||
      c.jobTitle?.toLowerCase().includes(q)
  );
}

// Create a normalized contact object from raw form data
export function createContact(formData) {
  return {
    id: generateContactId(),
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    company: formData.company?.trim() ?? '',
    jobTitle: formData.jobTitle?.trim() ?? '',
    createdAt: new Date().toISOString(),
  };
}

// Check whether an email already exists in a contacts list (excluding a given id)
export function isDuplicateEmail(contacts, email, excludeId = null) {
  const normalized = email.trim().toLowerCase();
  return contacts.some(
    (c) => c.email === normalized && c.id !== excludeId
  );
}

// Blank form state
export const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
};
