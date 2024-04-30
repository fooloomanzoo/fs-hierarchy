import * as fs from 'node:fs';

import type { Type } from '../types.js';

import { resolveType } from './type.js';

/**
 * Define which type should be treated like a {@link Leaf} or a {@link Node}.
 *
 * @param pathname -       the absolute path
 * @param type -           the type of the entry
 * @param followSymlinks - if true then symbol links are followed
 * @param rootpath -       the path to the given root
 *
 * @returns if true the path should be treated like a leaf.
 */
export const isLeaf = (
  pathname: string,
  type: Type | undefined,
  followSymlinks?: boolean,
  rootpath: string = pathname,
): boolean => {
  if (type === 'dir') return false;

  if (type === 'symlink' && followSymlinks) {
    // NOTE: the symbolic link's target might not exist
    try {
      const realpath = fs.realpathSync.native(pathname);
      // NOTE: if the symbolic link is targeting a path whose path
      //   starts with the one from where the recursion started, the
      //   link is likely circular. attempt to prevent infinite loops
      if (!realpath.startsWith(rootpath)) {
        return isLeaf(
          realpath,
          resolveType(fs.lstatSync(realpath)),
          followSymlinks,
          rootpath,
        );
      }
    } catch {}
  }

  return true;
};
