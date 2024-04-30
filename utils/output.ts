import childProcess from 'node:child_process';
import path from 'node:path';
import util from 'node:util';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.join(__dirname, '..');
const execSync = util.promisify(childProcess.exec);

export async function createOutput({
  args = './src',
  hiddenArgs = '-r "./src" ',
  name = '',
  outputType = 'json',
}) {
  const { stdout } = await execSync(`./bin/run.js ${args} ${hiddenArgs}`, {
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
