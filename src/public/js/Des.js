function encrypt(text) {
  // Este es un ejemplo muy básico y no seguro
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i) + 1; // Desplazamiento simple
    result += String.fromCharCode(charCode);
  }
  return result;
}

function decrypt(text) {
  // Este es un ejemplo muy básico y no seguro
  let result = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i) - 1; // Desplazamiento simple
    result += String.fromCharCode(charCode);
  }
  return result;
}
