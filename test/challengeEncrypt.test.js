// Import the function to be tested
const { copyToClipboard } = require("../src/public/js/challengeEncrypt");

// Test case 1
test("copyToClipboard should copy the given text to the clipboard", () => {
  // Create a mock textarea element
  const textarea = document.createElement("textarea");
  document.body.appendChild(textarea);

  // Mock the document.execCommand method
  const execCommandMock = jest.fn();
  document.execCommand = execCommandMock;

  // Call the function
  const text = "Hello, world!";
  copyToClipboard(text);

  // Assertion
  expect(execCommandMock).toHaveBeenCalledWith("copy");
  expect(textarea.value).toBe(text);

  // Clean up
  document.body.removeChild(textarea);
});
