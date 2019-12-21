const button = document.body.querySelector('button');
const title = document.body.querySelector('.title');
const content = document.body.querySelector('.content');
const expression = document.body.querySelector('#expression');
const results = document.body.querySelectorAll('.result');


button.addEventListener('click', () => {
    expression.value = expression.value
        .split('')
        .filter(l => l !== ' ')
        .join('');

    const checkResult = grammarAnalyzer.checkExpression(expression.value);
    title.textContent = checkResult.success;
    content.textContent = checkResult.message;
    results.forEach(r => r.classList.remove('js-hidden'));
});