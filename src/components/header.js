const headerChange = (text) => {
    const headerHtml = document.querySelector('#header');
    const header = `<h1>${text}</h1>`;
    headerHtml.innerHTML = header;
}