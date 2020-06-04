const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const fs = require('fs').promises;

const ROOT = path.join(__dirname, '..');
const README = path.resolve(ROOT, 'README.md');

function replaceTag(source, tag, body) {
  if (source.includes(`<!-- ${tag} -->`)) {
    if (source.includes(`<!-- ${tag}stop -->`)) {
      source = source.replace(
        new RegExp(`<!-- ${tag} -->(.|\n)*<!-- ${tag}stop -->`, 'm'),
        `<!-- ${tag} -->`,
      );
    }
  }
  return source.replace(
    `<!-- ${tag} -->`,
    `<!-- ${tag} -->\n${body}\n<!-- ${tag}stop -->`,
  );
}

async function run({ name, args = './src', outputType = 'json' }) {
  const { stdout } = await exec('./bin/run -n "./src" ' + args, {
    cwd: ROOT,
  });
  return `## ${name}\n 
\`\`\`shell-script
$ fs-hierarchie ${args}
\`\`\`\n

\`\`\`${outputType}
${stdout}
\`\`\`\n
`;
}

async function main() {
  await exec('oclif-dev readme', {
    cwd: ROOT,
  });

  const content = await fs.readFile(README);
  const output = [
    await run({ name: 'JSON', args: './src', outputType: 'json' }),
    await run({ name: 'YAML', args: './src -o yaml', outputType: 'yaml' }),
    await run({ name: 'Tree', args: './src -o tree', outputType: '' }),
  ].join('\n');
  const modified = replaceTag(content.toString(), 'examples', output);
  await fs.writeFile(README, modified);
}

main();
