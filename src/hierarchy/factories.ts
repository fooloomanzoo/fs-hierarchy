import { Hierarchy, Leaf } from './types';

export const nodeFactory = (name: string, path: string): Hierarchy => ({
  name,
  path,
  children: [],
});

export const leafFactory = (name: string, path: string): Leaf => ({
  name,
  path,
});
