import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Returns a file-writer function.
 *
 * @param pathname - the pathname of the file
 */
export function toFile(pathname: string) {
  return (content: Buffer | string) =>
    fs.writeFileSync(path.resolve(pathname), content);
}
