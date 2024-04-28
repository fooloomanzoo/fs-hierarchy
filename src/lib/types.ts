import type { MinimatchOptions as IMinimatchOptions } from 'minimatch';
import type { Stats } from 'node:fs';

/** Types of a [Leaf](#Leaf) or [Node](#Node) entry */
export type Type =
  | 'block-device'
  | 'char-device'
  | 'dir'
  | 'file'
  | 'pipe'
  | 'socket'
  | 'symlink'
  | undefined;

/** **Leaf**-structure of the hierarchy map */
export interface Leaf {
  /** optionally included [extension](https://nodejs.org/api/path.html#path_path_extname_path) (only for [Leaf](#Leaf)s) */
  extension?: string;
  /** the name of the entry (without the base path) */
  name: string;
  /** optionally included absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths) */
  path?: string;
  /** optionally included [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) */
  stats?: Stats;
  /** optionally included [kind](#Kind) in the filesystem */
  type?: Type;
}

/** **Node**-structure of the hierarchy map */
export interface Node extends Omit<Leaf, 'extension'> {
  /**
   * children of the node
   * @defaultValue `[]`
   * */
  children: Array<Leaf | Node>;
}

/** The hierarchy map that will be returned. It can either be a [Leaf](#Leaf) or a [Node](#Node) */
export type Hierarchy = Leaf | Node;

/** [minimatch options](https://github.com/isaacs/minimatch#options) for filtering */
export type MinimatchOptions = {
  /** @defaultValue true */
  dot?: boolean;
  /** @defaultValue true */
  matchBase?: boolean;
} & IMinimatchOptions;

/** Use the options when you want to filter the resulting [hierarchy](#Hierarchy) object or want to include extra informations. */
export interface Options {
  /** use glob filter for the found [Leaf](#Leaf)s or the [Node](#Node)s. [minimatch](https://github.com/isaacs/minimatch) is used, have a look at the [differences](https://github.com/isaacs/minimatch#comparisons-to-other-fnmatchglob-implementations) */
  filter?: {
    /** when true and a [Node](#Node) has no children, the node will still be included in the output */
    empty?: boolean;
    /** glob filters for the absolute path of the found [Node](#Node)s. when all filters resolve successfully the node will be included. (negate by leading **!**) */
    match?: string | string[];
    /** [minimatch options](https://github.com/isaacs/minimatch#options) for filtering */
    options?: MinimatchOptions;
  };
  /** when true the hierarchy will be flattened. in cli, when **json** is the output format, the pathname is automatically included, for the other output formats the pathname will be used instead of the filename. */
  flatten?: boolean;
  /** included in the return object */
  include?: {
    /** when *true*, include the [extension](https://nodejs.org/api/path.html#path_path_extname_path) in return object (only for [Leaf](#Leaf)s) */
    extension?: boolean;
    /** when *true*, include the absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths) in return object */
    pathname?: boolean;
    /** when *true*, include [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) in return object */
    stats?: boolean;
    /** when *true*, include [type](#Type) in return object */
    type?: boolean;
  };
  /** give the root a name */
  rootName?: string;
  /** when true and there is a symlink, it can be tried to follow the link and determine its children when it is a node */
  symlinks?: boolean;
}
