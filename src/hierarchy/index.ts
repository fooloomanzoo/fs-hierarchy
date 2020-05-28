import * as path from 'path';
import { Hierarchy } from './types';
import { readdirRecursive } from './read-dir';

function create(root: string, rootName: string) {
  const hierarchy: Hierarchy = {
    name: rootName,
    path: path.resolve(root),
    children: [],
  };

  return readdirRecursive(hierarchy.path, hierarchy);
}

export default create;
