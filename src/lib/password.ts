const MIN_LENGTH = 8;
const MAX_LENGTH = 16;

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < MIN_LENGTH || password.length > MAX_LENGTH) {
    return { valid: false, error: `Password must be ${MIN_LENGTH}-${MAX_LENGTH} characters.` };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, error: "Password must include at least one letter." };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: "Password must include at least one number." };
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return { valid: false, error: "Password must include at least one special character." };
  }
  return { valid: true };
}

export const PASSWORD_REQUIREMENTS_TEXT =
  "8-16 characters, with at least one letter, one number, and one special character.";
