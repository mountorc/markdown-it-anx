const express = require('express');
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const markdownItAnx = require('../index');

const app = express();
const port = 3000;

const md = markdownIt().use(markdownItAnx);

app.get('/', (req, res) => {
  try {
    const testMarkdownPath = path.join(__dirname, 'test.md');
    const testMarkdown = fs.readFileSync(testMarkdownPath, 'utf8');
    const html = md.render(testMarkdown);
  
    res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>ANX Plugin Test</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1, h2 { color: #333; }
    .anx-container { 
      border: 1px solid #ddd; 
      padding: 15px; 
      margin: 20px 0; 
      background-color: #f9f9f9; 
      border-radius: 4px; 
    }
    .anx-box { 
      border: 1px solid #e8e8e8; 
      border-radius: 8px; 
      margin: 10px 0; 
      overflow: hidden; 
    }
    .anx-box-title { 
      background-color: #f0f0f0; 
      padding: 10px 15px; 
      font-weight: bold; 
      border-bottom: 1px solid #e8e8e8; 
    }
    .anx-box-content { 
      padding: 15px; 
    }
    .anx-box-item { 
      border: 1px solid #e0e0e0; 
      padding: 10px; 
      margin: 5px 0; 
      border-radius: 4px; 
      background-color: #fff; 
    }
    .anx-board { 
      display: flex; 
      flex-direction: column; 
      gap: 10px; 
      padding: 10px; 
    }
    .anx-text { 
      padding: 10px; 
      color: #333; 
    }
    .anx-input-wrapper { 
      margin: 10px 0; 
    }
    .anx-input { 
      padding: 8px 12px; 
      border: 1px solid #ddd; 
      border-radius: 4px; 
      width: 100%; 
      box-sizing: border-box; 
    }
    .anx-button { 
      padding: 8px 16px; 
      background-color: #409eff; 
      color: white; 
      border: none; 
      border-radius: 4px; 
      cursor: pointer; 
    }
    .anx-button:hover { 
      background-color: #66b1ff; 
    }
    .anx-error { 
      color: #f56c6c; 
      background-color: #fef0f0; 
      border: 1px solid #fbc4c4; 
      padding: 10px; 
      border-radius: 4px; 
    }
    .product { 
      border: 1px solid #e0e0e0; 
      padding: 10px; 
      margin: 5px 0; 
      border-radius: 4px; 
    }
    .product h2 { 
      margin-top: 0; 
      font-size: 18px; 
    }
    .price { 
      color: #f56c6c; 
      font-weight: bold; 
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>
    `);
  } catch (error) {
    res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Error</title>
</head>
<body>
  <h1>Error</h1>
  <p>${error.message}</p>
</body>
</html>
    `);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});