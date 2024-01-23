async function performKeyExchange() {
    // Generate key pairs for Alice and Bob
    const aliceKeyPair = await generateECDHKeyPair();
    const bobKeyPair = await generateECDHKeyPair();

    // Export public keys
    const alicePublicKey = await exportPublicKey(aliceKeyPair.publicKey);
    const bobPublicKey = await exportPublicKey(bobKeyPair.publicKey);

    // Import the other's public key
    const aliceImportedPublicKey = await importPublicKey(bobPublicKey);
    const bobImportedPublicKey = await importPublicKey(alicePublicKey);

    // Derive shared secrets
    const aliceSharedSecret = await deriveSharedSecret(aliceKeyPair.privateKey, aliceImportedPublicKey);
    const bobSharedSecret = await deriveSharedSecret(bobKeyPair.privateKey, bobImportedPublicKey);

    // Display the shared secret
    document.getElementById("sharedSecret").value = byteArrayToHex(aliceSharedSecret);
}

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

async function exportPublicKey(key) {
    const exported = await window.crypto.subtle.exportKey("raw", key);
    return new Uint8Array(exported);
}

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

function byteArrayToHex(byteArray) {
    return Array.from(byteArray, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
}
