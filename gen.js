const fs = require('fs');
const path = require('path');

if (process.argv.length > 2) {
  const cmp = process.argv[2];
  const fileList = fs.readdirSync('./template');

  const cmpDir = `./src/${cmp}`;
  const storyDir = `./src/${cmp}/stories`;
  fs.mkdirSync(cmpDir);
  fs.mkdirSync(storyDir);
  if (fs.existsSync(cmpDir) && fs.existsSync(storyDir)) {
    fileList.forEach(file => {
      let content = fs.readFileSync('./template/' + file, 'utf-8');
      const newFile = file.replace(/^TEMPLATE/, cmp);
      content = content.replace(/story\-TEMPLATE/g, `story-${cmp.toLowerCase()}`);
      fs.writeFileSync(
        path.join(/stories\.(mdx|tsx)$/.test(file) ? storyDir : cmpDir, newFile),
        content.replace(/TEMPLATE/g, cmp),
      );
    });
  } else {
    console.error('dir[' + cmpDir + '] does not exist');
  }
} else {
  console.error('please give component name');
}
