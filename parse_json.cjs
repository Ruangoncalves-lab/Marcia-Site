const fs = require('fs');

function extractStructure(elements, depth = 0) {
    if (!elements) return;
    elements.forEach(el => {
        const indent = '  '.repeat(depth);
        if (el.elType === 'widget') {
            let info = el.widgetType;
            if (el.widgetType === 'heading' && el.settings && el.settings.title) {
                info += ` (Text: "${el.settings.title.substring(0, 30)}")`;
            }
            if (el.widgetType === 'image' || el.widgetType === 'button') {
                info += ``;
            }
            console.log(`${indent}- Widget: ${info}`);
        } else if (el.elType === 'section' || el.elType === 'column') {
            console.log(`${indent}- ${el.elType}`);
            extractStructure(el.elements, depth + 1);
        }
    });
}

const data = JSON.parse(fs.readFileSync('home-1-pro.json', 'utf8'));
if (data.content) {
    extractStructure(data.content);
} else {
    console.log("No content array found.");
}
