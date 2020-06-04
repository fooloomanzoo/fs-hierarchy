import { lstatSync } from 'fs';
import { resolve } from 'path';
import type { Hierarchy, Options } from '../types';
import { readdirRecursive } from './read-dir';
import {
  resolveType,
  shouldTreatAsLeaf,
  leafFactory,
  nodeFactory,
} from './factories';

function hierarchy(root: string, options?: Options): Hierarchy {
  const resolvedPath = resolve(root);
  const type = resolveType(lstatSync(resolvedPath));

  if (shouldTreatAsLeaf(resolvedPath, type, options?.followSymlinks)) {
    return leafFactory(
      options?.rootName || resolvedPath,
      resolvedPath,
      type,
      options?.contain,
    );
  }

  const node = nodeFactory(
    options?.rootName || resolvedPath,
    resolvedPath,
    type,
    options?.contain,
  );

  return readdirRecursive(resolvedPath, node, options) || node;
}

export default hierarchy;
