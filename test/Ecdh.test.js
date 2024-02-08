// Import the function to be tested
const { deriveSharedSecret } = require("../src/public/js/Ecdh");

// Test case 1
test("deriveSharedSecret should return the correct shared secret", async () => {
  // Mock private and public keys
  const privateKey = new Uint8Array([1, 2, 3, 4]);
  const publicKey = new Uint8Array([5, 6, 7, 8]);

  // Call the function
  const result = await deriveSharedSecret(privateKey, publicKey);

  // Expected output
  const expected = new Uint8Array([9, 10, 11, 12]);

  // Assertion
  expect(result).toEqual(expected);
});
