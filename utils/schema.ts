import { readFileSync } from 'node:fs';
import path from 'node:path';
import { buildGenerator, getProgramFromFiles } from 'typescript-json-schema';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.join(__dirname, '..');

const tsConfig = readFileSync(path.resolve(ROOT, 'tsconfig.json'), 'utf8');

export async function createSchema() {
  const program = getProgramFromFiles(
    [path.resolve(ROOT, 'src', 'lib', 'types.ts')],
    {
      ...JSON.parse(JSON.stringify(tsConfig)).compilerOptions,
      target: 'ESNext',
    },
  );
  const generator = buildGenerator(program, {
    required: true,
  });

  if (!generator) {
    throw new Error('Can not create generator for types');

    return;
  }

  const symbols = generator.getMainFileSymbols(program);

  if (!symbols) {
    throw new Error('Can not get symbols from main file');

    return;
  }

  return generator?.getSchemaForSymbols(symbols);
}
