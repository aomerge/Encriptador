/**
 * Generates an ECDH key pair using the Web Crypto API.
 * @returns {Promise<CryptoKeyPair>} A promise that resolves to the generated key pair.
 */
async function generateECDHKeyPair() {
    return await window.crypto.subtle.generateKey(
        {
            name: "ECDH",
            namedCurve: "P-256"
        },
        true,
        ["deriveKey", "deriveBits"]
    );
}

/**
 * Exports the given key as a Uint8Array.
 * @param {CryptoKey} key - The key to be exported.
 * @returns {Promise<Uint8Array>} - The exported key as a Uint8Array.
 */
async function exportPublicKey(key) {
    const exported = await window.crypto.subtle.exportKey("raw", key);
    return new Uint8Array(exported);
}

/**
 * Imports a public key for ECDH encryption.
 * @param {ArrayBuffer} rawKey - The raw key data to import.
 * @returns {Promise<CryptoKey>} A promise that resolves with the imported public key.
 */
async function importPublicKey(rawKey) {
    return await window.crypto.subtle.importKey(
        "raw",
        rawKey,
        {
            name: "ECDH",
            namedCurve: "P-256"
        },
        true,
        []
    );
}

/**
 * Derives a shared secret using the Elliptic Curve Diffie-Hellman (ECDH) algorithm.
 * @param {CryptoKey} privateKey - The private key used for derivation.
 * @param {CryptoKey} publicKey - The public key used for derivation.
 * @returns {Promise<Uint8Array>} - The derived shared secret as a Uint8Array.
 */
async function deriveSharedSecret(privateKey, publicKey) {
    const bits = await window.crypto.subtle.deriveBits(
        {
            name: "ECDH",
            public: publicKey
        },
        privateKey,
        256
    );
    return new Uint8Array(bits);
}

/**
 * Converts a byte array to a hexadecimal string.
 *
 * @param {Array<number>} byteArray - The byte array to convert.
 * @returns {string} The hexadecimal string representation of the byte array.
 */
function byteArrayToHex(byteArray) {
    return Array.from(byteArray, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
}
