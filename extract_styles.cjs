const fs = require('fs');

const data = JSON.parse(fs.readFileSync('home-1-pro.json', 'utf8'));

console.log("=== Page Settings ===");
if (data.page_settings) {
    console.log(JSON.stringify(data.page_settings, null, 2));
}

// Search recursively for font family, colors, and border radius to get the primary theme
const fonts = new Set();
const colors = new Set();
const buttonStyles = [];

function searchStyles(obj) {
    if (!obj || typeof obj !== 'object') return;

    if (obj.typography_font_family) fonts.add(obj.typography_font_family);
    if (obj.title_typography_font_family) fonts.add(obj.title_typography_font_family);
    if (obj.text_typography_font_family) fonts.add(obj.text_typography_font_family);

    if (obj.color) colors.add(obj.color);
    if (obj.background_color) colors.add(obj.background_color);
    if (obj.title_color) colors.add(obj.title_color);

    if (obj.widgetType === 'button' && obj.settings) {
        buttonStyles.push({
            bg: obj.settings.background_color,
            color: obj.settings.button_text_color,
            radius: obj.settings.border_radius,
            typography: obj.settings.typography_font_family
        });
    }

    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            searchStyles(obj[key]);
        }
    }
}

searchStyles(data.content);

console.log("\n=== Fonts Found ===");
console.log(Array.from(fonts));

console.log("\n=== Colors Found ===");
console.log(Array.from(colors).filter(c => c && c.startsWith('#')));

console.log("\n=== Button Sample ===");
console.log(JSON.stringify(buttonStyles.slice(0, 3), null, 2));

