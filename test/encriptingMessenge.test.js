// Import the function to be tested
const { replaceText } = require("../src/public/js/encriptingMessenge");

// Test case
test('replaceText should replace all occurrences of "e" with "enter"', () => {
  // Input
  const text = "Hello, this is a test message";

  // Expected output
  const expected = "Hentello, this is a tenterst menterssage";

  // Call the function
  const result = replaceText(text);

  // Assertion
  expect(result).toBe(expected);
});
