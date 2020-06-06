import type { Stats } from 'fs';

/** Types of a [Leaf](#Leaf) or [Node](#Node) entry */
export type Types =
  | 'file'
  | 'dir'
  | 'symlink'
  | 'block-device'
  | 'char-device'
  | 'pipe'
  | 'socket'
  | undefined;

/** **Leaf**-structure of the hierarchy map */
export interface Leaf {
  /** the name of the entry (without the base path) */
  name: string;
  /** optionally included [extension](https://nodejs.org/api/path.html#path_path_extname_path) (only for [Leaf](#Leaf)s) */
  extension?: string;
  /** optionally included absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths) */
  path?: string;
  /** optionally included [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) */
  stats?: Stats;
  /** optionally included [type](#Types) in the filesystem */
  type?: Types;
}

/** **Node**-structure of the hierarchy map */
export interface Node extends Omit<Leaf, 'extension'> {
  /** children of the node */
  children: Array<Node | Leaf>;
}

/** The hierarchy map that will be returned. It can either be a [Leaf](#Leaf) or a [Node](#Node) */
export type Hierarchy = Node | Leaf;

/** Use the options if want to filter the resulting [hierarchy](#Hierarchy) object or want to include extra informations.*/
export interface Options {
  /** included in the return object */
  include?: {
    /** if *true*, include the absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths) in return object */
    withPath?: boolean;
    /** if *true*, include [type](#Types) in return object */
    withType?: boolean;
    /** if *true*, include [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) in return object */
    withStats?: boolean;
    /** if *true*, include the [extension](https://nodejs.org/api/path.html#path_path_extname_path) in return object (only for [Leaf](#Leaf)s) */
    withExtension?: boolean;
  };
  /** inverse results for *filter*, *leafFilter* and *nodeFilter* */
  inverse?: boolean;
  /** filter for the absolute paths of the found [Leaf](#Leaf)s or the [Node](#Node)s */
  filter?: string | RegExp;
  /** if true and there is a symlink, it can be tried to follow the link and determine its children if it is a node */
  followSymlinks?: boolean;
  /** filter for the name of the found [Leaf](#Leaf)s */
  leafFilter?: string | RegExp;
  /** filter for the name of the found [Node](#Node)s */
  nodeFilter?: string | RegExp;
  /** if true, [Node](#Node)s with no children won't be returned (except for the root-node) */
  noEmptyChildNodes?: boolean;
  /** give the root a name */
  rootName?: string;
}
