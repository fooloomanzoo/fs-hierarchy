/* eslint-disable unicorn/prefer-regexp-test */
/* eslint-disable max-params */
import * as fs from 'node:fs';
import * as path from 'node:path';

import type { Node, Options } from '../types.js';

import { leaf, node } from './factories.js';
import { isLeaf } from './utils/leaf.js';
import { resolveType } from './utils/type.js';

type Matcher = { match: (path: string) => boolean };

/**
 * Reads a directory recursively.
 *
 * @param pathname -  the absolute path of the node
 * @param tree - the recursivly applied **hierarchy**-structure
 * @param options -   the given options
 * @param rootPath -  the path to the given root (set by default at the first iteration)
 *
 * @returns the **Node**-structure or null (if optional *noEmpty* is set to true and there are no children)
 */
export function readdirRecursive(
  pathname: string,
  tree: Node,
  options: Options,
  matchers: Matcher[] = [],
  rootPath: string = pathname,
): Node | null {
  const content = fs.readdirSync(pathname, { withFileTypes: true });

  for (const entry of content) {
    const type = resolveType(entry);
    const resolvedPath = path.resolve(pathname, entry.name);

    if (isLeaf(resolvedPath, type, options.symlinks, rootPath)) {
      // optionally apply filter to the path of a leaf
      if (matchers.every(m => !m.match(resolvedPath))) {
        continue;
      }

      tree.children.push(leaf(entry.name, resolvedPath, type, options.include));
    } else {
      const child = readdirRecursive(
        resolvedPath,
        node(entry.name, resolvedPath, type, options.include),
        options,
        matchers,
        rootPath,
      );

      if (child) {
        tree.children.push(child);
      }
    }
  }

  // optionally return **null** if there are no children
  if (!options?.filter?.empty && tree.children.length === 0) {
    return null;
  }

  return tree;
}
