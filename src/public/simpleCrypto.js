async function encrypt(text, password) {
  const pwUtf8 = new TextEncoder().encode(password);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const alg = { name: "AES-GCM", iv: iv };
  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "encrypt",
  ]);
  const ptUtf8 = new TextEncoder().encode(text);
  const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUtf8);
  const ctArray = Array.from(new Uint8Array(ctBuffer));
  const ivArray = Array.from(iv);
  const resultArray = ivArray.concat(ctArray);
  const resultStr = resultArray
    .map((byte) => String.fromCharCode(byte))
    .join("");
  const resultBase64 = btoa(resultStr);
  return resultBase64;
}

async function decrypt(ctBase64, password) {
  const pwUtf8 = new TextEncoder().encode(password);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);
  const ctStr = atob(ctBase64);
  const ctArray = ctStr.match(/[\s\S]/g).map((ch) => ch.charCodeAt(0));
  const iv = new Uint8Array(ctArray.slice(0, 12));
  const ctUint8 = new Uint8Array(ctArray.slice(12));
  const alg = { name: "AES-GCM", iv: iv };
  const key = await crypto.subtle.importKey("raw", pwHash, alg, false, [
    "decrypt",
  ]);
  const plainBuffer = await crypto.subtle.decrypt(alg, key, ctUint8);
  const plaintext = new TextDecoder().decode(plainBuffer);
  return plaintext;
}

async function performEncryption() {
  const text = document.getElementById("inputText").value;
  const password = document.getElementById("password").value;
  const encryptedText = await encrypt(text, password);
  console.log(encryptedText);
  document.getElementById("output").textContent = encryptedText;
}

async function performDecryption() {
  const text = document.getElementById("inputText").value;
  const password = document.getElementById("password").value;
  const decryptedText = await decrypt(text, password);
  console.log(decryptedText);
  document.getElementById("output").textContent = decryptedText;
}
