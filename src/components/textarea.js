
/**
 * Renders a textarea with a password input field.
 * @returns {Promise<void>} A promise that resolves when the textarea is rendered.
 */
const TextareaPassword = async ()=>{
    const textareaHtml = await document.querySelector(".textarea");
    const textareaElement = `
        <input type="text" id="password" placeholder="Enter password">
        <textarea id="inputText"  placeholder="Ingrese el texto aqui" name="hola" id="input" cols="30" rows="10"></textarea>
    `;
    return textareaHtml.innerHTML = textareaElement;
}
/**
 * Renders a textarea.
 * @returns {Promise<void>} A promise that resolves when the textarea is rendered.
 */
const Textarea = async ()=>{
    const textareaHtml = await document.querySelector(".textarea");
    const textareaElement = `
        <textarea id="inputText"  placeholder="Ingrese el texto aqui" name="hola" id="input" cols="30" rows="10"></textarea>
    `;
    return textareaHtml.innerHTML = textareaElement;
}