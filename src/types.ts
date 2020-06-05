import type { Stats } from 'fs';

/** Types of a {@link Leaf} or {@link Node} */
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

/** **Leaf**-structure of the hierarchie map */
export interface Leaf {
  name: string;
  /** optionally included *extension* (only for {@link Leaf}s) */
  extension?: string;
  /** optionally included absolute *path* */
  path?: string;
  /** optionally included *{@link fs#Stats | stats}* */
  stats?: Stats;
  /** optionally included *type* in the filesystem */
  type?: Types;
}

/** **Node**-structure of the hierarchie map */
export interface Node extends Omit<Leaf, 'extension'> {
  /** children of the node */
  children: Array<Node | Leaf>;
}

export declare type Hierarchy = Node | Leaf;

export interface Options {
  /** included in the return object */
  include?: {
    /** if *true*, include **path** in return object */
    withPath?: boolean;
    /** if *true*, include **type** in return object */
    withType?: boolean;
    /** if *true*, include **stats** in return object */
    withStats?: boolean;
    /** if *true*, include **extension** in return object (only for {@link Leaf}s) */
    withExtension?: boolean;
  };
  /** inverse results for *filter*, *leafFilter* and *nodeFilter* */
  inverse?: boolean;
  /** filter for the absolute paths of the found {@link Leaf}s or the {@link Node}s */
  filter?: string | RegExp;
  /** if true and there is a symlink, it can be tried to follow the link and determine its children if it is a node */
  followSymlinks?: boolean;
  /** filter for the name of the found {@link Leaf}s */
  leafFilter?: string | RegExp;
  /** filter for the name of the found {@link Node}s */
  nodeFilter?: string | RegExp;
  /** if true, {@link Node}s with no children won't be returned (except for the root-node) */
  noEmptyChildNodes?: boolean;
  /** give the root a name */
  rootName?: string;
}
