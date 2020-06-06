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

async function createOutputMd({
  name,
  args = './src',
  hiddenArgs = '-n "./src" ',
  outputType = 'json',
}) {
  const { stdout } = await exec('./bin/run ' + args + ' ' + hiddenArgs, {
    cwd: ROOT,
  });
  return `## ${name}\n 
\`\`\`shell-script
$ fs-hierarchy ${args}
\`\`\`\n

\`\`\`${outputType}
${stdout}
\`\`\`\n
`;
}

async function createSchema() {
  const { stdout } = await exec(
    'node ./node_modules/.bin/typescript-json-schema ./src/types.ts "*" --required',
    {
      cwd: ROOT,
    },
  );
  return JSON.parse(stdout);
}

function createSchemaTable(schema, title) {
  const createAnyOf = anyOf =>
    anyOf &&
    anyOf
      .map(
        o =>
          o.type ||
          `[${o.$ref.replace('#/definitions/', '')}](${o.$ref.replace(
            '/definitions/',
            '',
          )})`,
      )
      .join(', ');
  const createEntry = (key, entry, required) => {
    let row = `${key} | ${required ? '☐' : '☑'} | ${
      entry.type || createAnyOf(entry.anyOf)
    } | ${entry.description || '─'}`;
    if (entry.properties) {
      // eslint-disable-next-line guard-for-in
      for (const p in entry.properties) {
        row += '\n' + createEntry(`*${key}*.${p}`, entry.properties[p]);
      }
    }
    return row;
  };

  return `${title}
${schema.description ? schema.description : ''}
${schema.anyOf ? createAnyOf(schema.anyOf) : ''}
${schema.enum ? schema.enum.map(e => `* \`${e}\``).join('\n') : ''}
${
  schema.properties
    ? `name | optional | type | description
--- | --- | --- | ---
${Object.entries(schema.properties)
  .map(([key, entry]) =>
    createEntry(key, entry, schema.required && schema.required.includes(key)),
  )
  .join('\n')}`
    : ''
}`;
}

async function main() {
  await exec('oclif-dev readme', {
    cwd: ROOT,
  });

  const schema = await createSchema();

  const outputs = [
    await createOutputMd({
      name: 'JSON',
      args: './src',
      outputType: 'json',
    }),
    await createOutputMd({
      name: 'with extension, path, type & stats',
      args: './test -i ext path type stats',
      hiddenArgs: '-n "./test"',
      outputType: 'json',
    }),
    await createOutputMd({
      name: 'YAML',
      args: './src -o yaml',
      outputType: 'yaml',
    }),
    await createOutputMd({
      name: 'Tree',
      args: './src -o tree',
      outputType: '',
    }),
  ].join('\n');

  let content = (await fs.readFile(README)).toString();

  content = replaceTag(content, 'examples', outputs);

  // eslint-disable-next-line guard-for-in
  for (const key in schema.definitions) {
    const table = createSchemaTable(schema.definitions[key], `## ${key}`);
    content = replaceTag(content, key, table);
  }

  await fs.writeFile(README, content);
}

main();
