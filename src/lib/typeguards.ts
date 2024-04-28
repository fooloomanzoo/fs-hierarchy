import type { Hierarchy, Node } from './types.js';

export const isNode = (h: Hierarchy): h is Node => 'children' in h;
