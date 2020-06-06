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

      tree += indention;
      tree += isLastChild ? ' ╰─ ' : ' ├─ ';

      tree += toTree(h.children[i], indention + (isLastChild ? '   ' : ' │ '));
    }
  }

  return tree;
};
