function simpleEncrypt(text) {
  // Este es un ejemplo muy básico y no seguro
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i) + 1; // Desplazamiento simple
    result += String.fromCharCode(charCode);
  }
  return result;
}

function simpleDecrypt(text) {
  // Este es un ejemplo muy básico y no seguro
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i) - 1; // Desplazamiento simple
    result += String.fromCharCode(charCode);
  }
  return result;
}

function performEncryption() {
  const text = document.getElementById("inputText").value;
  const encryptedText = simpleEncrypt(text);
  document.getElementById("output").textContent = encryptedText;
}

function performDecryption() {
  const text = document.getElementById("output").textContent;
  const decryptedText = simpleDecrypt(text);
  document.getElementById("inputText").value = decryptedText;
}
