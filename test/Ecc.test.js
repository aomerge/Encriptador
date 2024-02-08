// Import the function to be tested
const { generateKeyPairs } = require("../src/public/js/Ecc");

// Mock the required dependencies
window.crypto = {
  subtle: {
    generateKey: jest.fn(),
    deriveKey: jest.fn(),
  },
};

document.getElementById = jest.fn().mockReturnValue({
  classList: {
    add: jest.fn(),
  },
});

// Test case 1
test("generateKeyPairs should generate key pairs and derive shared secret", async () => {
  // Mock the generateKey function
  window.crypto.subtle.generateKey.mockResolvedValueOnce({
    publicKey: "publicKeyA",
    privateKey: "privateKeyA",
  });
  window.crypto.subtle.generateKey.mockResolvedValueOnce({
    publicKey: "publicKeyB",
    privateKey: "privateKeyB",
  });

  // Mock the deriveKey function
  window.crypto.subtle.deriveKey.mockResolvedValueOnce("sharedSecret");

  // Call the function
  await generateKeyPairs();

  // Assertion
  expect(window.crypto.subtle.generateKey).toHaveBeenCalledTimes(2);
  expect(window.crypto.subtle.generateKey).toHaveBeenCalledWith(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey"]
  );

  expect(window.crypto.subtle.deriveKey).toHaveBeenCalledTimes(1);
  expect(window.crypto.subtle.deriveKey).toHaveBeenCalledWith(
    {
      name: "ECDH",
      public: "publicKeyB",
    },
    "privateKeyA",
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );

  expect(document.getElementById).toHaveBeenCalledTimes(1);
  expect(document.getElementById).toHaveBeenCalledWith("generateKey");
  expect(
    document.getElementById("generateKey").classList.add
  ).toHaveBeenCalledWith("AniNone");
});
