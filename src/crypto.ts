import CryptoJS from 'crypto-js';
import forge from 'node-forge';

// --- Classical Ciphers ---

export function caesarCipher(str: string, shift: number, encrypt: boolean): string {
    const s = encrypt ? shift : -shift;
    return str.split('').map(char => {
        const code = char.charCodeAt(0);
        // Uppercase letters
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + s) % 26 + 26) % 26 + 65);
        }
        // Lowercase letters
        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + s) % 26 + 26) % 26 + 97);
        }
        return char; // Non-alphabetic characters
    }).join('');
}

export function atbashCipher(str: string): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const reversedAlphabet = 'zyxwvutsrqponmlkjihgfedcba';
    return str.split('').map(char => {
        const lowerChar = char.toLowerCase();
        const index = alphabet.indexOf(lowerChar);
        if (index !== -1) {
            // Preserve case
            return char === lowerChar ? reversedAlphabet[index] : reversedAlphabet[index].toUpperCase();
        }
        return char; // Non-alphabetic characters
    }).join('');
}

// --- Hashing Algorithms ---

export async function sha256Hash(str: string): Promise<string> {
    const textAsBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- Symmetric Encryption ---

export function aesEncrypt(str: string, key: string): string {
    if (!key) return "Error: Secret key is required for AES encryption.";
    return CryptoJS.AES.encrypt(str, key).toString();
}

export function aesDecrypt(str: string, key: string): string {
    if (!key) return "Error: Secret key is required for AES decryption.";
    try {
        const bytes = CryptoJS.AES.decrypt(str, key);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (!originalText) {
            throw new Error("Invalid key or ciphertext.");
        }
        return originalText;
    } catch (e) {
        return "Decryption failed. Invalid key or ciphertext.";
    }
}

export function chacha20Encrypt(str: string, key: string): string {
    if (!key) return "Error: Secret key is required for ChaCha20 encryption.";
    return CryptoJS.ChaCha20.encrypt(str, key).toString();
}

export function chacha20Decrypt(str: string, key: string): string {
    if (!key) return "Error: Secret key is required for ChaCha20 decryption.";
     try {
        const bytes = CryptoJS.ChaCha20.decrypt(str, key);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (!originalText) {
            throw new Error("Invalid key or ciphertext.");
        }
        return originalText;
    } catch (e) {
        return "Decryption failed. Invalid key or ciphertext.";
    }
}


// --- Asymmetric Encryption ---

export function generateRsaKeyPair(): { publicKey: string, privateKey: string } {
    const keys = forge.pki.rsa.generateKeyPair(2048);
    const publicKey = forge.pki.publicKeyToPem(keys.publicKey);
    const privateKey = forge.pki.privateKeyToPem(keys.privateKey);
    return { publicKey, privateKey };
}

export function rsaEncrypt(str: string, publicKeyPem: string): string {
    try {
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const encrypted = publicKey.encrypt(str, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
        });
        return forge.util.encode64(encrypted);
    } catch (e) {
        return "RSA Encryption failed. Invalid public key.";
    }
}

export function rsaDecrypt(str: string, privateKeyPem: string): string {
     try {
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
        const decoded = forge.util.decode64(str);
        const decrypted = privateKey.decrypt(decoded, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
        });
        return decrypted;
    } catch (e) {
        return "RSA Decryption failed. Invalid private key or ciphertext.";
    }
}