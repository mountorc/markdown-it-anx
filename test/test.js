const markdownIt = require('markdown-it');
const markdownItAnx = require('../index');

const md = markdownIt().use(markdownItAnx);

const testMarkdown = `
# Test ANX Plugin

:::anx
This is ANX content
:::

Regular text here
`;

const result = md.render(testMarkdown);
console.log('Test Result:');
console.log(result);