let publicKeyA, privateKeyA, publicKeyB, privateKeyB, sharedSecret;

async function generateKeyPairs() {
  const keyPairA = await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey"]
  );
  publicKeyA = keyPairA.publicKey;
  privateKeyA = keyPairA.privateKey;

  const keyPairB = await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey"]
  );
  publicKeyB = keyPairB.publicKey;
  privateKeyB = keyPairB.privateKey;

  sharedSecret = await window.crypto.subtle.deriveKey(
    {
      name: "ECDH",
      public: publicKeyB,
    },
    privateKeyA,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function performEncryption() {
  const inputText = document.getElementById("inputText").value;
  const encoded = new TextEncoder().encode(inputText);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    sharedSecret,
    encoded
  );
  const encryptedText =
    iv.join(",") +
    "," +
    btoa(String.fromCharCode(...new Uint8Array(encrypted)));
   console.log(encryptedText);
  document.getElementById("outputText").value = encryptedText;
}

async function performDecryption() {
  const encryptedData = document.getElementById("outputText").value.split(",");
  const iv = new Uint8Array(encryptedData.slice(0, 12).map(Number));
  const encryptedText = encryptedData[12];
  const encryptedBuffer = new Uint8Array(
    atob(encryptedText)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    sharedSecret,
    encryptedBuffer
  );
  const decryptedText = new TextDecoder().decode(decrypted);
  document.getElementById("outputText").value = decryptedText;
}
