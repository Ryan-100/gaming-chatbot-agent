export function maskChar(str: string) {
  if (str.length <= 8 && str.length > 0) {
    return '*'.repeat(str.length);
  } else if (!str) {
    return '-';
  }
  return '*'.repeat(8) + str.slice(8);
}
export function maskEmail(email: string) {
  if (!email.includes('@')) {
    return '-';
  }

  const [localPart, domain] = email.split('@');

  // Check if the local part is long enough to apply masking
  if (localPart.length > 2) {
    const maskedLocalPart =
      localPart.slice(0, 2) + '*'.repeat(5) + localPart.slice(-1);
    return `${maskedLocalPart}@${domain}`;
  }

  // If the local part is too short, return it as is
  return email;
}
