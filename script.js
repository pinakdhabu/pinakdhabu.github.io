document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const algorithmSelect = document.getElementById('algorithm');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const keyContainer = document.getElementById('key-container');
    const keyInput = document.getElementById('keyInput');

    // --- Cipher Functions ---

    function caesarCipher(str, shift) {
        return str.split('').map(char => {
            const code = char.charCodeAt(0);
            if (code >= 65 && code <= 90) { // Uppercase letters
                return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
            }
            if (code >= 97 && code <= 122) { // Lowercase letters
                return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
            }
            return char; // Non-alphabetic characters
        }).join('');
    }

    function atbashCipher(str) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const reversedAlphabet = 'zyxwvutsrqponmlkjihgfedcba';
        return str.split('').map(char => {
            const lowerChar = char.toLowerCase();
            const index = alphabet.indexOf(lowerChar);
            if (index !== -1) {
                return char === lowerChar ? reversedAlphabet[index] : reversedAlphabet[index].toUpperCase();
            }
            return char; // Non-alphabetic characters
        }).join('');
    }

    async function sha256Hash(str) {
        const textAsBuffer = new TextEncoder().encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', textAsBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    function aesEncrypt(str, key) {
        if (!key) return "Error: Secret key is required for AES encryption.";
        return CryptoJS.AES.encrypt(str, key).toString();
    }

    function aesDecrypt(str, key) {
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

    // --- UI Logic ---

    function updateUIForAlgorithm() {
        const algorithm = algorithmSelect.value;
        if (algorithm === 'aes') {
            keyContainer.style.display = 'block';
        } else {
            keyContainer.style.display = 'none';
        }

        if (algorithm === 'sha256') {
            decryptBtn.disabled = true;
            decryptBtn.style.opacity = 0.5;
        } else {
            decryptBtn.disabled = false;
            decryptBtn.style.opacity = 1;
        }
    }

    // --- Event Listeners ---

    algorithmSelect.addEventListener('change', updateUIForAlgorithm);

    encryptBtn.addEventListener('click', async () => {
        const text = inputText.value;
        const algorithm = algorithmSelect.value;
        let result = '';

        switch (algorithm) {
            case 'caesar':
                result = caesarCipher(text, 3);
                break;
            case 'atbash':
                result = atbashCipher(text);
                break;
            case 'sha256':
                result = await sha256Hash(text);
                break;
            case 'aes':
                result = aesEncrypt(text, keyInput.value);
                break;
        }
        outputText.value = result;
    });

    decryptBtn.addEventListener('click', () => {
        const text = inputText.value;
        const algorithm = algorithmSelect.value;
        let result = '';

        switch (algorithm) {
            case 'caesar':
                result = caesarCipher(text, -3);
                break;
            case 'atbash':
                result = atbashCipher(text);
                break;
            case 'aes':
                result = aesDecrypt(text, keyInput.value);
                break;
            // No case for sha256 as it's a one-way hash
        }
        outputText.value = result;
    });

    // Initial UI setup
    updateUIForAlgorithm();
});