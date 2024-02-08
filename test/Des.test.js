// Import the function to be tested
const { encrypt } = require("../src/public/js/Des");

// Test case 1
test("encrypt should return the encrypted text with a simple shift", () => {
  // Input
  const text = "Hello, World!";

  // Call the function
  const result = encrypt(text);

  // Expected output
  const expected = 'Ifmmp-0Xpsme"';

  // Assertion
  expect(result).toBe(expected);
});
