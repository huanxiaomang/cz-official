const { readdirSync } = require('fs');

const files = readdirSync("./docs/course");
console.log(files.map((file) => ({
    text: file.replace(".md", ""),
    link: file.replace(".md", ""),
}))); 
