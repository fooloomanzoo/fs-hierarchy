import * as fs from 'fs';
import * as path from 'path';

const toFile = (pathname: string) => (content: string) =>
  fs.writeFileSync(path.resolve(pathname), content);

export default toFile;
