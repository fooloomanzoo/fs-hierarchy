import { promises as fs } from 'node:fs';
import path from 'node:path';

import { createOutput } from './output';
import { createSchema } from './schema';
import { createSchemaTable } from './table';
import { replaceTag } from './tags';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.join(__dirname, '..');

async function main() {
  let content;
  const schema = await createSchema();

  if (!schema) {
    throw new Error('Can not create type schema');

    return;
  }

  const README = path.resolve(ROOT, 'README.md');
  const readme = await fs.readFile(README);
  content = readme.toString();

  if (schema.definitions) {
    for (const key of Object.keys(schema.definitions)) {
      const table = createSchemaTable(schema.definitions[key], `## ${key}`);
      content = replaceTag(content, key, table);
    }
  }

  content = replaceTag(
    content.toString(),
    'output',
    [
      await createOutput({
        args: "./src -m 'index.ts'",
        hiddenArgs: '-r "./src"',
        name: 'JSON',
        outputType: 'json',
      }),
      await createOutput({
        args: "./src -f tree -m '*.ts'",
        hiddenArgs: '-r "./src"',
        name: 'Tree',
        outputType: '',
      }),
    ].join('\n'),
  );

  await fs.writeFile(README, content);

  const FORMAT = path.resolve(ROOT, 'docs', 'format.md');
  content = await fs.readFile(FORMAT);

  content = replaceTag(
    content.toString(),
    'help',
    await createOutput({
      args: '--help',
      hiddenArgs: '',
      name: 'CLI',
      outputType: '',
    }),
  );

  content = replaceTag(
    content.toString(),
    'format',
    [
      await createOutput({
        args: './src -f tree',
        name: 'Tree',
        outputType: '',
      }),
      await createOutput({
        args: './src/lib/hierarchy -f tree --flat',
        name: 'Tree (flattened)',
        outputType: '',
      }),
      await createOutput({
        args: './src -f yaml',
        name: 'YAML',
        outputType: 'yaml',
      }),
      await createOutput({
        args: './src/lib/hierarchy -f yaml --flat',
        name: 'YAML (flattened)',
        outputType: 'yaml',
      }),
      await createOutput({
        args: './src/lib/hierarchy',
        name: 'JSON',
        outputType: 'json',
      }),
      await createOutput({
        args: './src/lib/hierarchy --flat',
        name: 'JSON (flattened)',
        outputType: 'json',
      }),
      await createOutput({
        args: './src --min',
        name: 'JSON (minified)',
        outputType: 'json',
      }),
      await createOutput({
        args: './src/lib/format -i ext path type stats',
        name: 'Include extension, path, type & stats',
        outputType: 'json',
      }),
      await createOutput({
        args: './src/lib/hierarchy -r "TOPLEVEL"',
        hiddenArgs: '-f tree',
        name: 'Custom root name',
        outputType: '',
      }),
    ].join('\n'),
  );

  await fs.writeFile(FORMAT, content);

  const FILTERS = path.resolve(ROOT, 'docs', 'filters.md');
  content = await fs.readFile(FILTERS);

  content = replaceTag(
    content.toString(),
    'help',
    await createOutput({
      args: '--help',
      hiddenArgs: '',
      name: 'CLI',
      outputType: '',
    }),
  );

  content = replaceTag(
    content.toString(),
    'filter',
    [
      await createOutput({
        args: "./src --match 'index.ts'",
        name: 'match files',
        outputType: 'json',
      }),
      await createOutput({
        args: "./src -m 'index.ts' -e",
        name: 'match files (including empty nodes)',
        outputType: 'json',
      }),
      await createOutput({
        args: "./src -m '*@(e|x).ts'",
        hiddenArgs: '-r "./src" -f tree',
        name: 'glob pattern list',
        outputType: '',
      }),
      await createOutput({
        args: "./src -m '**/{json,hierarchy}.ts'",
        hiddenArgs: '-r "./src" -f tree',
        name: 'glob brace expansion',
        outputType: '',
      }),
      await createOutput({
        args: "./src -m '*n.ts' '*s.ts'",
        hiddenArgs: '-r "./src" -f tree',
        name: 'multiple glob patterns',
        outputType: '',
      }),
      await createOutput({
        args: "./ -m '!**/{dist,.git,node_modules}/**'",
        hiddenArgs: '-r "./src" -f tree',
        name: 'glob negation',
        outputType: '',
      }),
    ].join('\n'),
  );

  await fs.writeFile(FILTERS, content);
}

await main();
