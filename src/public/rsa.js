let publicKey, privateKey;

async function generateKeyPair() {
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
  document.getElementById(elementId).value = base64Key;
}

async function performEncryption() {
  const inputText = document.getElementById("inputText").value;
  const encoded = new TextEncoder().encode(inputText);
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encoded
  );
  const encryptedText = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  console.log(encryptedText);
  document.getElementById("outputText").value = encryptedText;
}

async function performDecryption() {
  const encryptedText = document.getElementById("outputText").value;
  const encryptedBuffer = new Uint8Array(
    atob(encryptedText)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    encryptedBuffer
  );
  const decryptedText = new TextDecoder().decode(decrypted);
  document.getElementById("inputText").value = decryptedText;
}
