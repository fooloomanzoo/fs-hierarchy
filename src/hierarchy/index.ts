import { lstatSync } from 'fs';
import { resolve } from 'path';
import { Hierarchy, Options } from './types';
import { readdirRecursive } from './read-dir';
import { resolveType, isLeaf, leafFactory, nodeFactory } from './factories';

function create(root: string, rootName: string, options: Options): Hierarchy {
  const resolvedPath = resolve(root);
  const type = resolveType(lstatSync(resolvedPath));

  if (isLeaf(resolvedPath, type, options.followSymlinks)) {
    return leafFactory(rootName, resolvedPath, type, options.include);
  }

  return readdirRecursive(
    resolvedPath,
    nodeFactory(rootName, resolvedPath, type, options.include),
    options,
  );
}

export = create;
