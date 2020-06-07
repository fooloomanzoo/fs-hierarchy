import type { Stats } from 'fs';
import * as minimatch from 'minimatch';

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
  /**
   * children of the node
   * @default `[]`
   * */
  children: Array<Node | Leaf>;
}

/** The hierarchy map that will be returned. It can either be a [Leaf](#Leaf) or a [Node](#Node) */
export type Hierarchy = Node | Leaf;

/** [minimatch options](https://github.com/isaacs/minimatch#options) for filtering */
export interface MinimatchOptions extends minimatch.IOptions {
  /** @default true */
  dot?: boolean;
  /** @default true */
  matchBase?: boolean;
}

/** Use the options if want to filter the resulting [hierarchy](#Hierarchy) object or want to include extra informations. */
export interface Options {
  /** use glob filter for the found [Leaf](#Leaf)s or the [Node](#Node)s. [minimatch](https://github.com/isaacs/minimatch) is used, have a look at the [differences](https://github.com/isaacs/minimatch#comparisons-to-other-fnmatchglob-implementations) */
  filter?: {
    /** glob filter for the absolute path of the found [Node](#Node)s (negate by leading **!**) */
    match?: string;
    /** [minimatch options](https://github.com/isaacs/minimatch#options) for filtering */
    options?: MinimatchOptions;
    /** if true and a [Node](#Node) has no children, the node will be not returned */
    noEmpty?: boolean;
  };
  /** if true and there is a symlink, it can be tried to follow the link and determine its children if it is a node */
  followSymlinks?: boolean;
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
  /** give the root a name */
  rootName?: string;
}
