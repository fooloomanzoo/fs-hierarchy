import { Stats } from 'fs';

export type Types =
  | 'file'
  | 'dir'
  | 'symlink'
  | 'block-device'
  | 'char-device'
  | 'pipe'
  | 'socket'
  | undefined;

export { Stats };

export interface Leaf {
  name: string;
  extension?: string;
  path?: string;
  stats?: Stats;
  type?: Types;
}

export interface Node extends Leaf {
  children: Array<Node | Leaf>;
}

export type Hierarchy = Node | Leaf;

export type Options = {
  include: Array<'path' | 'extension' | 'type' | 'stats'>;
  inverse?: boolean;
  filter?: RegExp;
  followSymlinks: boolean;
  leafFilter?: RegExp;
  nodeFilter?: RegExp;
  rootName: string;
};
