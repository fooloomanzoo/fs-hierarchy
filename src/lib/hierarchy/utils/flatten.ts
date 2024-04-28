import type { Hierarchy, Node } from '../../types.js';

export function flatten(tree: Hierarchy): Node {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...other } = tree as Node;
  const flattened: Node = {
    ...other,
    children: [],
  };

  function traverse(node: Hierarchy) {
    if ('children' in node && node.children.length > 0) {
      for (const child of node.children) {
        traverse(child);
      }
    } else {
      flattened.children.push(node);
    }
  }

  traverse(tree);

  return flattened;
}
