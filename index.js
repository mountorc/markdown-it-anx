function markdownItAnx(md) {
  md.block.ruler.before('fence', 'anx_fence', function(state, startLine, endLine, silent) {
    const start = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];
    
    if (start + 3 > max) return false;
    
    let marker = state.src[start];
    if (marker !== ':') return false;
    
    let pos = start + 1;
    while (pos < max && state.src[pos] === marker) pos++;
    
    const markerCount = pos - start;
    if (markerCount < 3) return false;
    
    const markup = state.src.slice(start, pos);
    const params = state.src.slice(pos, max).trim();
    
    if (params !== 'anx') return false;
    
    if (silent) return true;
    
    let nextLine = startLine;
    let content = '';
    
    while (true) {
      nextLine++;
      if (nextLine >= endLine) break;
      
      const startPos = state.bMarks[nextLine] + state.tShift[nextLine];
      const endPos = state.eMarks[nextLine];
      
      if (startPos < endPos && state.src[startPos] === marker) {
        let markerPos = startPos;
        while (markerPos < endPos && state.src[markerPos] === marker) markerPos++;
        
        if (markerPos - startPos >= markerCount) {
          break;
        }
      }
      
      content += state.src.slice(startPos, endPos) + '\n';
    }
    
    state.line = nextLine + 1;
    
    const token = state.push('fence', 'div', 0);
    token.markup = markup;
    token.content = content.trim();
    token.info = 'anx';
    token.map = [startLine, nextLine];
    token.attrs = [];
    
    return true;
  });
  
  const getPropertyValue = (obj, path) => {
    if (!obj || typeof obj !== 'object') return undefined;
    
    const keys = path.split('.');
    let value = obj;
    
    for (const key of keys) {
      if (value[key] === undefined) {
        return undefined;
      }
      value = value[key];
    }
    
    return value;
  };
  
  const parseTemplate = (templateContent, data) => {
    if (!templateContent) return '';
    
    let parsedTemplate = templateContent;
    
    const doubleBracesRegex = /\{\{([^{}]+)\}\}/g;
    parsedTemplate = parsedTemplate.replace(doubleBracesRegex, (match, variable) => {
      const value = getPropertyValue(data, variable.trim());
      return value !== undefined ? value : match;
    });
    
    const dollarBracesRegex = /\$\{([^{}]+)\}/g;
    parsedTemplate = parsedTemplate.replace(dollarBracesRegex, (match, variable) => {
      const value = getPropertyValue(data, variable.trim());
      return value !== undefined ? value : match;
    });
    
    const singleBracesRegex = /\{([^{}]+)\}/g;
    parsedTemplate = parsedTemplate.replace(singleBracesRegex, (match, variable) => {
      const value = getPropertyValue(data, variable.trim());
      return value !== undefined ? value : match;
    });
    
    return parsedTemplate;
  };
  
  const renderComponent = (component) => {
    if (!component || !component.kind) {
      return '<div class="anx-error">Invalid component</div>';
    }
    
    switch (component.kind) {
      case 'box':
        return renderBox(component);
      case 'board':
        return renderBoard(component);
      case 'text':
        return renderText(component);
      case 'input':
        return renderInput(component);
      case 'button':
        return renderButton(component);
      default:
        return `<div class="anx-component anx-${component.kind}">${JSON.stringify(component)}</div>`;
    }
  };
  
  const renderBox = (component) => {
    const title = component.title || '';
    const data = component.data || [];
    const html = component.html || '';
    const template = component.template || '';
    
    let content = '';
    if (data.length > 0) {
      data.forEach((item, index) => {
        const templateContent = template || html;
        if (templateContent) {
          content += `<div class="anx-box-item">${parseTemplate(templateContent, item)}</div>`;
        }
      });
    } else {
      const templateContent = template || html;
      if (templateContent) {
        content = parseTemplate(templateContent, component);
      }
    }
    
    return `
      <div class="anx-box">
        ${title ? `<div class="anx-box-title">${title}</div>` : ''}
        <div class="anx-box-content">${content}</div>
      </div>
    `;
  };
  
  const renderBoard = (component) => {
    const kinds = component.kinds || [];
    let content = '';
    
    kinds.forEach((subComponent) => {
      content += renderComponent(subComponent);
    });
    
    return `<div class="anx-board">${content}</div>`;
  };
  
  const renderText = (component) => {
    const value = component.value || '';
    return `<div class="anx-text">${value}</div>`;
  };
  
  const renderInput = (component) => {
    const placeholder = component.placeholder || '';
    const value = component.value || '';
    const nick = component.nick || '';
    
    return `
      <div class="anx-input-wrapper">
        <input type="text" class="anx-input" placeholder="${placeholder}" value="${value}" ${nick ? `name="${nick}"` : ''}>
      </div>
    `;
  };
  
  const renderButton = (component) => {
    const label = component.label || 'Button';
    const action = component.action || '';
    
    return `
      <button class="anx-button" ${action ? `data-action="${action}"` : ''}>
        ${label}
      </button>
    `;
  };
  
  const defaultRender = md.renderer.rules.fence;
  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    if (token.info === 'anx') {
      try {
        const component = JSON.parse(token.content);
        return `<div class="anx-container">${renderComponent(component)}</div>`;
      } catch (error) {
        return `<div class="anx-container anx-error">Invalid JSON: ${error.message}</div>`;
      }
    }
    return defaultRender ? defaultRender(tokens, idx, options, env, self) : '';
  };
}

module.exports = markdownItAnx;