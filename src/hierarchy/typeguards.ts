import { Hierarchy, Node } from './types';

export const isNode = (h: Hierarchy): h is Node => 'children' in h;
