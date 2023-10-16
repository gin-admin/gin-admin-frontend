const tokenKey = 'token';
const tokenTypeKey = 'token_type';
const expiresAtKey = 'expires_at';
const defaultTokenType = 'Bearer';

/**
 * The function sets a token and token type in session storage if they are provided as arguments.
 */
export function setToken(token?: string, tokenType?: string, expiresAt?: number) {
  if (token) {
    sessionStorage.setItem(tokenKey, token);
  }
  if (tokenType) {
    sessionStorage.setItem(tokenTypeKey, tokenType);
  }
  if (expiresAt) {
    sessionStorage.setItem(expiresAtKey, expiresAt.toString());
  }
}

/**
 * This function retrieves a token from the session storage or returns an empty string if it doesn't
 * exist.
 */
export function getToken() {
  return sessionStorage.getItem(tokenKey) || '';
}

/**
 * This function retrieves the token type from session storage or returns a default value.
 */
export function getTokenType() {
  return sessionStorage.getItem(tokenTypeKey) || defaultTokenType;
}

/**
 * This function retrieves the expiration time from the session storage.
 */
export function getExpiresAt() {
  const exp = sessionStorage.getItem(expiresAtKey) || '0';
  return parseInt(exp);
}

/**
 * The function removes a token and its type from the session storage.
 */
export function removeToken() {
  sessionStorage.removeItem(tokenKey);
  sessionStorage.removeItem(tokenTypeKey);
  sessionStorage.removeItem(expiresAtKey);
}
