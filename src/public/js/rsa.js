let publicKey, privateKey;

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

async function displayKey(key, elementId) {
  const exportedKey = await window.crypto.subtle.exportKey("spki", key);
  const base64Key = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
  const element = document.getElementById(elementId);
  const keyElement = `<p>${base64Key}</p>`;
  element.innerHTML = keyElement;
  return keyElement;
}

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