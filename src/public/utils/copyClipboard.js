/**
 * Copies the specified text to the clipboard.
 *
 * @param {string} text - The text to be copied.
 */
function copyToClipboard(text) {
  // Create a temporary textarea element
  const buttonCopy = document.getElementById("copy");
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  // Select the text and copy it to the clipboard
  textarea.select();
  document.execCommand("copy");
  // Remove the temporary element
  document.body.removeChild(textarea);
  buttonCopy.classList.add("fadeIn");
  buttonCopy.innerHTML = "Copiado!";
}
