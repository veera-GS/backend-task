import crypto from 'crypto'

export function generateRandomString(length = 16) {
    return crypto.randomBytes(length).toString('hex'); 
}