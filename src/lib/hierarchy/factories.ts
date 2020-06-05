import * as fs from 'fs';
import * as path from 'path';
import type { Node, Leaf, Types, Options } from '../types';

/**
 * Returns a {@link Leaf}-object.
 *
 * @param name -     the name of the leaf
 * @param pathname - the absolute path of the leaf
 * @param type -     the type of the leaf
 * @param include -  included within the return object
 *
 * @returns An object that contains informations about the wanted leaf.
 */
export function leafFactory(
  name: string,
  pathname: string,
  type: Types,
  include: Options['include'] = {},
): Leaf {
  const ret: Leaf = {
    name,
  };

  if (include.withPath) {
    ret.path = pathname;
  }

  if (include.withExtension) {
    ret.extension = path.extname(pathname);
  }

  if (include.withType) {
    ret.type = type;
  }

  if (include.withStats) {
    ret.stats = fs.lstatSync(pathname);
  }

  return ret;
}

/**
 * Returns a {@link Node}-object.
 *
 * @param name -     the name of the node
 * @param pathname - the absolute path of the node
 * @param type -     the type of the node
 * @param include -  included within the return object
 *
 * @returns An object that contains informations about the wanted node.
 */
export function nodeFactory(
  name: string,
  pathname: string,
  type: Types,
  include: Options['include'] = {},
): Node {
  return {
    ...leafFactory(name, pathname, type, { ...include, withExtension: false }),
    children: [],
  };
}

/**
 * Resolves the type of an entry given by *fs*.
 *
 * @param entry - an entry given by various *fs*-functions
 *
 * @returns the type of the entry
 */
export const resolveType = (entry: fs.Dirent | fs.Stats): Types => {
  if (entry.isFile()) return 'file';
  if (entry.isDirectory()) return 'dir';
  if (entry.isSymbolicLink()) return 'symlink';
  if (entry.isBlockDevice()) return 'block-device';
  if (entry.isCharacterDevice()) return 'char-device';
  if (entry.isFIFO()) return 'pipe';
  if (entry.isSocket()) return 'socket';
};

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
export const shouldTreatAsLeaf = (
  pathname: string,
  type: Types,
  followSymlinks?: boolean,
  rootpath: string = pathname,
): boolean => {
  if (type === 'dir') return false;

  if (type === 'symlink') {
    if (followSymlinks) {
      // NOTE: the symbolic link's target might not exist
      try {
        const realpath = fs.realpathSync.native(pathname);
        // NOTE: if the symbolic link is targeting a path whose path
        //   starts with the one from where the recursion started, the
        //   link is likely circular. attempt to prevent infinite loops
        if (!realpath.startsWith(rootpath)) {
          return shouldTreatAsLeaf(
            realpath,
            resolveType(fs.lstatSync(realpath)),
            followSymlinks,
            rootpath,
          );
        }
      } catch {}
    }
  }

  return true;
};
