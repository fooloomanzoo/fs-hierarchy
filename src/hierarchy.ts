import * as fs from 'fs';
import * as path from 'path';
import { Hierarchy } from './hierarchy.types';
import { leafFactory, nodeFactory } from './hierarchy.factory';

const readdirRecursive = (location: string, parent: Hierarchy): Hierarchy =>
  fs
    .readdirSync(path.resolve(location))
    .reduce((result: Hierarchy, filename: string) => {
      const resolvedPath = path.resolve(location, filename);
      const stat = fs.statSync(resolvedPath);

      if (stat.isFile()) {
        const leaf = leafFactory(filename, resolvedPath);
        result.children.push(leaf);
      } else if (stat.isDirectory()) {
        const node = readdirRecursive(
          resolvedPath,
          nodeFactory(filename, resolvedPath),
        );
        result.children.push(node);
      }

      return result;
    }, parent);

function create(root: string, rootName: string) {
  const hierarchy: Hierarchy = {
    name: rootName,
    path: path.resolve(root),
    children: [],
  };

  return readdirRecursive(hierarchy.path, hierarchy);
}

export default create;
