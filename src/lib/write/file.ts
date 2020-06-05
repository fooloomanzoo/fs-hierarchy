import * as fs from 'fs';
import * as path from 'path';

/**
 * Returns a file-writer function.
 *
 * @param pathname - the pathname of the file
 */
const toFile = (pathname: string) => (content: string | Buffer) =>
  fs.writeFileSync(path.resolve(pathname), content);

export default toFile;
