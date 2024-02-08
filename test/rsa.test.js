// Import the function to be tested
const { generateKeyPairs } = require("../src/public/js/rsa");

// Mock the window.crypto.subtle.generateKey function
window.crypto.subtle.generateKey = jest.fn().mockResolvedValue({
  publicKey: "mockPublicKey",
  privateKey: "mockPrivateKey",
});

// Mock the displayKey function
const displayKey = jest.fn();

// Test case 1
test("generateKeyPairs should call window.crypto.subtle.generateKey with the correct parameters", async () => {
  // Call the function
  await generateKeyPairs();

  // Assertion
  expect(window.crypto.subtle.generateKey).toHaveBeenCalledWith(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
});

// Test case 2
test("generateKeyPairs should call displayKey with the correct parameters", async () => {
  // Call the function
  await generateKeyPairs();

  // Assertion
  expect(displayKey).toHaveBeenCalledWith("mockPublicKey", "publicKey");
  expect(displayKey).toHaveBeenCalledWith("mockPrivateKey", "privateKey");
});
