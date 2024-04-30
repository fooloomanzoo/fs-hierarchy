import { Minimatch } from 'minimatch';
import { lstatSync } from 'node:fs';
import { resolve } from 'node:path';

import type { Hierarchy, Leaf, MatchOptions, Node, Options } from './types.js';

import { leaf, node } from './utils/factories.js';
import { flatten } from './utils/flatten.js';
import { isLeaf } from './utils/leaf.js';
import { readdirRecursive } from './utils/read-dir.js';
import { resolveType } from './utils/type.js';

/**
 * Creates a hierarchy tree structure based on the given root path and options.
 *
 * @param root - The root path of the hierarchy.
 * @param options - The options for configuring the hierarchy.
 * @returns The hierarchy tree structure.
 */
export function hierarchy(
  root: string,
  // eslint-disable-next-line unicorn/no-object-as-default-parameter
  options: Options = {
    filter: {},
    flatten: false,
    include: {
      extension: false,
      pathname: false,
      stats: false,
      type: false,
    },
    rootName: resolve(root),
    symlinks: false,
  },
): Leaf | Node {
  const resolvedPath = resolve(root);
  const type = resolveType(lstatSync(resolvedPath));

  /** include pathname by default, if the hierarchy should be flattened */
  options.include = options.include || {};
  options.include.pathname =
    options.include.pathname ?? Boolean(options.flatten);

  /** default minimatch options */
  const minimatchOptions: MatchOptions = {
    dot: true,
    matchBase: true,
    ...options?.filter?.options,
  };
  /** create minimatch resolver */
  const matcher =
    (options?.filter?.match &&
      (Array.isArray(options?.filter?.match)
        ? options.filter.match
        : [options.filter.match])) ||
    [];
  const matchers = matcher.map(match => new Minimatch(match, minimatchOptions));

  let tree: Hierarchy;

  if (isLeaf(resolvedPath, type, options?.symlinks)) {
    tree = leaf(
      options.rootName || resolvedPath,
      resolvedPath,
      type,
      options.include,
    );
  } else {
    tree = node(
      options.rootName || resolvedPath,
      resolvedPath,
      type,
      options.include,
    );

    tree =
      readdirRecursive(resolvedPath, tree as Node, options, matchers) || tree;
  }

  if (options.flatten) {
    return flatten(tree);
  }

  return tree;
}
