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

// Test case 2
test("TextareaPassword should return a string", () => {
  // Call the function
  const result = TextareaPassword();

  // Assertion
  expect(typeof result).toBe("string");
});

// Test case 3
test("TextareaPassword should contain an input element with type 'text'", () => {
  // Call the function
  const result = TextareaPassword();

  // Assertion
  expect(result).toContain('<input type="text"');
});

// Test case 4
test("TextareaPassword should contain a textarea element", () => {
  // Call the function
  const result = TextareaPassword();

  // Assertion
  expect(result).toContain("<textarea");
});

// Test case 5
test("TextareaPassword should contain a placeholder for the password input", () => {
  // Call the function
  const result = TextareaPassword();

  // Assertion
  expect(result).toContain('placeholder="Enter password"');
});

// Test case 6
test("TextareaPassword should contain a placeholder for the textarea input", () => {
  // Call the function
  const result = TextareaPassword();

  // Assertion
  expect(result).toContain('placeholder="Ingrese el texto aqui"');
});
