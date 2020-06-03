import { lstatSync } from 'fs';
import { resolve } from 'path';
import { Hierarchy, Options } from './types';
import { readdirRecursive } from './read-dir';
import { resolveType, isLeaf, leafFactory, nodeFactory } from './factories';

function hierarchy(root: string, options?: Options): Hierarchy {
  const resolvedPath = resolve(root);
  const type = resolveType(lstatSync(resolvedPath));

  if (isLeaf(resolvedPath, type, options?.followSymlinks)) {
    return leafFactory(
      options?.rootName || resolvedPath,
      resolvedPath,
      type,
      options?.contain,
    );
  }

  return readdirRecursive(
    resolvedPath,
    nodeFactory(
      options?.rootName || resolvedPath,
      resolvedPath,
      type,
      options?.contain,
    ),
    options,
  );
}

export default hierarchy;
