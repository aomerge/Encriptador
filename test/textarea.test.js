// Import the function to be tested
const { TextareaPassword } = require("../src/components/textarea");

// Test case 1
test("TextareaPassword should return the correct HTML for the textarea", () => {
  // Call the function
  const result = TextareaPassword();

  // Expected output
  const expected = `
        <input type="text" id="password" placeholder="Enter password">
        <textarea id="inputText"  placeholder="Ingrese el texto aqui" name="hola" id="input" cols="30" rows="10"></textarea>
    `;

  // Assertion
  expect(result).toBe(expected);
});
