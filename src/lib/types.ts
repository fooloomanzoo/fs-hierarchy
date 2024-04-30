import type { MinimatchOptions } from 'minimatch';
import type { Stats } from 'node:fs';

/**
 * Types of a Leaf or Node entry
 **/
export type Type =
  | 'block-device'
  | 'char-device'
  | 'dir'
  | 'file'
  | 'pipe'
  | 'socket'
  | 'symlink';

/**
 * a Leaf of the hierarchy
 **/
export type Leaf = {
  /**
   * optionally included extension (only for `Leaf`s)
   **/
  extension?: string;
  /**
   * the name of the entry (without the base path)
   **/
  name: string;
  /**
   * optionally included absolute path
   **/
  path?: string;
  /**
   * optionally included `Stats` (https://nodejs.org/api/fs.html#fs_class_fs_stats)
   **/
  stats?: Stats;
  /**
   * optionally included `Type` in the filesystem
   **/
  type?: Type;
};

/**
 * a Node of the hierarchy
 * */
export type Node = {
  /**
   * children of the `Node`
   * @defaultValue `[]`
   **/
  children: Array<Leaf | Node>;
} & Omit<Leaf, 'extension'>;

export type Hierarchy = Leaf | Node;

/**
 * `minimatch` options for filtering (https://github.com/isaacs/minimatch#options)
 **/
export type MatchOptions = {
  /** @defaultValue true */
  dot?: boolean;
  /** @defaultValue true */
  matchBase?: boolean;
} & MinimatchOptions;

/**
 * The logical rule how filter patterns should be applied
 *
 * when set to `all` all filters must resolve successfully,
 * when set to `some` at least one filter must resolve successfully,
 * when set to `none` no filter must resolve successfully
 */
export type MatchRule = 'all' | 'none' | 'some';

/**
 * Use the options when you want to filter the resulting Hierarchy object or want to include extra informations.
 **/
export type Options = {
  /**
   * filter options the resulting Hierarchy object
   */
  filter?: {
    /**
     * when `true` and a `Node` has no children, the node will still be included in the output
     **/
    empty?: boolean;
    /**
     * glob filters for the absolute path of the found `Node`s. when all filters resolve successfully the `Node` will be included. (negate by leading **!**)
     **/
    match?: string | string[];
    /**
     * [minimatch options](https://github.com/isaacs/minimatch#options) for filtering
     **/
    options?: MatchOptions;
    /**
     * @defaultValue some
     **/
    rule?: MatchRule;
  };
  /**
   * when `true`, the hierarchy will be flattened.
   **/
  flatten?: boolean;
  /**
   * included in the return object
   **/
  include?: {
    /**
     * when `true`, include the extension in return object (only for `Leaf`s)
     **/
    extension?: boolean;
    /**
     * when `true`, include the absolute path in return object
     **/
    pathname?: boolean;
    /**
     * when `true`, include stats in return object (https://nodejs.org/api/fs.html#fs_class_fs_stats)
     **/
    stats?: boolean;
    /**
     * when `true`, include the type in return object
     **/
    type?: boolean;
  };
  /**
   * the used text of the root node
   **/
  rootName?: string;
  /**
   * when `true`, symlinks are followed
   **/
  symlinks?: boolean;
};
