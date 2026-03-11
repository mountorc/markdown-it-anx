# markdown-it-anx Plugin

## Project Background

The markdown-it-anx plugin is an extension for the markdown-it library that enables the rendering of ANX (AI Native Ex) components within markdown files. ANX is an Agent-friendly frontend coding format designed to establish a unified standard for frontend interactions, following the specification from [https://github.com/mountorc/anx-protocol](https://github.com/mountorc/anx-protocol).

### Key Features
- Support for ANX component syntax using `:::anx` fence blocks
- JSON-based component configuration
- Dynamic rendering of various ANX component types
- Template parsing with variable substitution
- Error handling for invalid JSON

## Installation

```bash
npm install markdown-it-anx
```

## Usage

### Basic Usage

```javascript
const markdownIt = require('markdown-it');
const markdownItAnx = require('markdown-it-anx');

const md = markdownIt().use(markdownItAnx);

const markdown = `
# Test ANX Plugin

:::anx
{
  "kind": "box",
  "title": "Welcome",
  "html": "<p>Hello, {{user.name}}!</p>"
}
:::
`;

const html = md.render(markdown);
console.log(html);
```

### Supported Component Types

#### Box Component

```markdown
:::anx
{
  "kind": "box",
  "title": "Product List",
  "data": [
    { "name": "Product 1", "price": 100 },
    { "name": "Product 2", "price": 200 }
  ],
  "html": "<div><h2>{{name}}</h2><p>${{price}}</p></div>"
}
:::
```

#### Board Component

```markdown
:::anx
{
  "kind": "board",
  "kinds": [
    { "kind": "text", "value": "User Information" },
    { "kind": "input", "placeholder": "Enter your name" },
    { "kind": "button", "label": "Submit" }
  ]
}
:::
```

#### Text Component

```markdown
:::anx
{
  "kind": "text",
  "value": "This is a text component"
}
:::
```

#### Input Component

```markdown
:::anx
{
  "kind": "input",
  "placeholder": "Enter something",
  "value": "Initial value"
}
:::
```

#### Button Component

```markdown
:::anx
{
  "kind": "button",
  "label": "Click Me",
  "action": "doSomething"
}
:::
```

## Template Syntax

The plugin supports variable substitution in templates using the following syntax:
- `{{variable}}` - Double braces syntax
- `${{variable}}` - Dollar brace syntax
- `{variable}` - Single brace syntax

### Example

```markdown
:::anx
{
  "kind": "box",
  "title": "User Profile",
  "data": [
    { "name": "John", "age": 30, "email": "john@example.com" }
  ],
  "html": "<div><h2>{{name}}</h2><p>Age: {{age}}</p><p>Email: {{email}}</p></div>"
}
:::
```

## Testing

The project includes a test server for previewing ANX components:

1. Start the test server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Modify the `test/test.md` file to test different ANX components

4. Refresh the browser to see changes (no server restart required)

## Project Structure

```
markdown-it-anx/
├── index.js          # Main plugin implementation
├── package.json      # Project configuration
├── READER.md         # This documentation
└── test/
    ├── server.js     # Test server
    ├── test.js       # Test script
    └── test.md       # Test markdown file
```

## API Reference

### Plugin Initialization

```javascript
const md = markdownIt().use(markdownItAnx);
```

### Component Rendering

The plugin automatically renders ANX components enclosed in `:::anx` fence blocks:

```markdown
:::anx
{
  "kind": "component_type",
  "property1": "value1",
  "property2": "value2"
}
:::
```

## Troubleshooting

### Common Issues

1. **JSON Parse Error**
   - Ensure your JSON is valid
   - Check for missing commas between properties
   - Ensure all strings are properly quoted

2. **Template Not Rendering**
   - Check that your template syntax is correct
   - Ensure variables in templates match the data structure

3. **Component Not Displaying**
   - Verify the component type is supported
   - Check for typos in component properties

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

---

# markdown-it-anx 插件

## 项目背景

markdown-it-anx 插件是 markdown-it 库的扩展，用于在 markdown 文件中渲染 ANX（AI Native Ex）组件。ANX 是一种面向 Agent 的前端编码格式，旨在建立统一的前端交互标准，遵循 [https://github.com/mountorc/anx-protocol](https://github.com/mountorc/anx-protocol) 中的规范。

### 主要功能
- 支持使用 `:::anx` 围栏块的 ANX 组件语法
- 基于 JSON 的组件配置
- 各种 ANX 组件类型的动态渲染
- 带变量替换的模板解析
- 无效 JSON 的错误处理

## 安装

```bash
npm install markdown-it-anx
```

## 使用方法

### 基本使用

```javascript
const markdownIt = require('markdown-it');
const markdownItAnx = require('markdown-it-anx');

const md = markdownIt().use(markdownItAnx);

const markdown = `
# 测试 ANX 插件

:::anx
{
  "kind": "box",
  "title": "欢迎",
  "html": "<p>你好，{{user.name}}！</p>"
}
:::
`;

const html = md.render(markdown);
console.log(html);
```

### 支持的组件类型

#### Box 组件

```markdown
:::anx
{
  "kind": "box",
  "title": "产品列表",
  "data": [
    { "name": "产品 1", "price": 100 },
    { "name": "产品 2", "price": 200 }
  ],
  "html": "<div><h2>{{name}}</h2><p>${{price}}</p></div>"
}
:::
```

#### Board 组件

```markdown
:::anx
{
  "kind": "board",
  "kinds": [
    { "kind": "text", "value": "用户信息" },
    { "kind": "input", "placeholder": "请输入姓名" },
    { "kind": "button", "label": "提交" }
  ]
}
:::
```

## 模板语法

插件支持在模板中使用以下语法进行变量替换：
- `{{variable}}` - 双大括号语法
- `${{variable}}` - 美元大括号语法
- `{variable}` - 单大括号语法

## 测试

项目包含一个测试服务器，用于预览 ANX 组件：

1. 启动测试服务器：
   ```bash
   npm start
   ```

2. 打开浏览器并导航到 `http://localhost:3000`

3. 修改 `test/test.md` 文件来测试不同的 ANX 组件

4. 刷新浏览器查看更改（无需重启服务器）

## 项目结构

```
markdown-it-anx/
├── index.js          # 主要插件实现
├── package.json      # 项目配置
├── READER.md         # 本文档
└── test/
    ├── server.js     # 测试服务器
    ├── test.js       # 测试脚本
    └── test.md       # 测试 markdown 文件
```

## 许可证

MIT 许可证