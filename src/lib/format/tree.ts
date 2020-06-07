import type { Hierarchy } from '../../types';
import { isNode } from '../typeguards';

/**
 * Returns a tree-string-representation for a given hierarchy-structure.
 *
 * @param h -        the hierarchy-structure
 * @param indention - the current intention-preemble of the the current recursion step
 */
export const toTree = (h: Hierarchy, indention = '') => {
  let tree = h.name + '\n';

  if (isNode(h)) {
    for (let i = 0; i < h.children.length; i++) {
      const isLastChild = i === h.children.length - 1;
      const child = h.children[i];

      tree += indention;
      tree += isLastChild ? ' ╰' : ' ├';

      if (isNode(child) && child.children.length === 0) {
        tree += '╌ ';
      } else {
        tree += '─ ';
      }

      tree += toTree(h.children[i], indention + (isLastChild ? '   ' : ' │ '));
    }
  }

  return tree;
};
