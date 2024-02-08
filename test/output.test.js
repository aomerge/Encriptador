// Import the function to be tested
const { replaceText } = require("../src/public/js/encriptingMessenge");

// Test case 1
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

// Test case 2
test('replaceText should replace all occurrences of "a" with "alpha"', () => {
  // Input
  const text = "This is a sample text";

  // Expected output
  const expected = "This is alpha salphample text";

  // Call the function
  const result = replaceText(text);

  // Assertion
  expect(result).toBe(expected);
});

// Test case 3
test('replaceText should replace all occurrences of "o" with "omega"', () => {
  // Input
  const text = "The quick brown fox jumps over the lazy dog";

  // Expected output
  const expected = "The quick brwown fwx jumps wver the lazy dwg";

  // Call the function
  const result = replaceText(text);

  // Assertion
  expect(result).toBe(expected);
});
