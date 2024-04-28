import type { Hierarchy } from '../types.js';

import { isNode } from '../typeguards.js';

/**
 * Returns a tree-string-representation for a given hierarchy-structure.
 *
 * @param h -        the hierarchy-structure
 * @param indention - the current intention-preemble of the the current recursion step
 * @param flatten -  whether the tree should be flattened
 */
export const toTree = (h: Hierarchy, flatten = false, indention = '') => {
  let tree = ((flatten && h.path) || h.name) + '\n';

  if (isNode(h)) {
    for (let i = 0; i < h.children.length; i++) {
      const isLastChild = i === h.children.length - 1;
      const child = h.children[i];

      tree += indention;
      tree += isLastChild ? ' ╰' : ' ├';

      tree += isNode(child) && child.children.length === 0 ? '╌ ' : '─ ';

      tree += toTree(
        h.children[i],
        flatten,
        indention + (isLastChild ? '   ' : ' │ '),
      );
    }
  }

  return tree;
};
