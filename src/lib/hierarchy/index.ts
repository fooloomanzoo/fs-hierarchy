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

/**
 * Create a hierarchy map of a filesystem using node's built-in *fs*.
 *
 * @param root - an absolute or a relative path
 * @param options - the given options
 *
 * @returns {@link Hierarchy} returns a map that at least contains an entry of the name and an entry for its children entries, if there was given a path to directory-like entry of the filesystem
 */
function hierarchy(
  root: string,
  options: Options = {
    inverse: false,
    filter: undefined,
    followSymlinks: false,
    leafFilter: undefined,
    nodeFilter: undefined,
    noEmptyChildNodes: false,
    rootName: resolve(root),
    include: {
      withPath: false,
      withType: false,
      withStats: false,
      withExtension: false,
    },
  },
): Hierarchy {
  const resolvedPath = resolve(root);
  const type = resolveType(lstatSync(resolvedPath));

  if (shouldTreatAsLeaf(resolvedPath, type, options?.followSymlinks)) {
    return leafFactory(
      options.rootName || resolvedPath,
      resolvedPath,
      type,
      options.include,
    );
  }

  const node = nodeFactory(
    options.rootName || resolvedPath,
    resolvedPath,
    type,
    options.include,
  );

  return readdirRecursive(resolvedPath, node, options) || node;
}

export default hierarchy;
