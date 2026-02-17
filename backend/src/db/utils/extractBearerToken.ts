/**
 * Estrae il token da un'authorization header
 * @param authorization - Authorization header
 * @returns Token se presente, null altrimenti
 */

export function extractBearerToken(authorization: string | undefined) {
    if(!authorization || !authorization.startsWith('Bearer ')) {
        return null;
    }
    return authorization.replace('Bearer ', '').trim() || null;
}