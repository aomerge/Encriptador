/**
 * Public key used for encryption.
 * @type {string}
 */
let publicKey, privateKey;

/**
 * Generates RSA key pairs using the Web Crypto API.
 * @returns {Promise<void>} A promise that resolves when the key pairs are generated.
 */
async function generateKeyPairs() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
  publicKey = keyPair.publicKey;
  privateKey = keyPair.privateKey;

  displayKey(publicKey, "publicKey");
  displayKey(privateKey, "privateKey");
}

/**
 * Displays the base64 representation of a given key in the specified HTML element.
 * @param {CryptoKey} key - The key to be displayed.
 * @param {string} elementId - The ID of the HTML element where the key will be displayed.
 * @returns {string} - The base64 representation of the key.
 */
async function displayKey(key, elementId) {
  const exportedKey = await window.crypto.subtle.exportKey("spki", key);
  const base64Key = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
  const element = document.getElementById(elementId);
  const keyElement = `<p>${base64Key}</p>`;
  element.innerHTML = keyElement;
  return keyElement;
}

/**
 * Encrypts the given text using RSA-OAEP encryption algorithm.
 * @param {string} text - The text to be encrypted.
 * @returns {Promise<string>} - The encrypted text.
 */
async function encrypt(text) {
  const encoded = new TextEncoder().encode(text);
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encoded
  );
  const encryptedText = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  return encryptedText;
}

/**
 * Decrypts the given text using RSA-OAEP encryption algorithm.
 * 
 * @param {string} text - The encrypted text to be decrypted.
 * @returns {Promise<string>} - A promise that resolves to the decrypted text.
 */
async function decrypt(text) {
  const encryptedBuffer = new Uint8Array(atob(text).split("").map((char) => char.charCodeAt(0)));
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    encryptedBuffer
  );
  const decryptedText = new TextDecoder().decode(decrypted);
  return decryptedText;
}