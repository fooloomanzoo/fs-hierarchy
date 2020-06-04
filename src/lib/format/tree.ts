import type { Hierarchy } from '../types';
import { isNode } from '../typeguards';

const toTree = (h: Hierarchy, preemble = '') => {
  let tree = h.name + '\n';

  if (isNode(h)) {
    for (let i = 0; i < h.children.length; i++) {
      const isLastChild = i === h.children.length - 1;

      tree += preemble;
      tree += isLastChild ? ' ╰─ ' : ' ├─ ';

      tree += toTree(h.children[i], preemble + (isLastChild ? '   ' : ' │ '));
    }
  }

  return tree;
};

export default toTree;
