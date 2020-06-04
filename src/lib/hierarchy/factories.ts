import * as fs from 'fs';
import * as path from 'path';
import type { Node, Leaf, Options, Types } from '../types';

export const leafFactory = (
  filename: string,
  pathname: string,
  type: Types,
  contain?: Options['contain'],
): Leaf => {
  const ret: Leaf = {
    name: filename,
  };
  if (contain) {
    if (contain.includes('path')) {
      ret.path = pathname;
    }

    if (contain.includes('extension')) {
      ret.extension = path.extname(pathname);
    }

    if (contain.includes('stats')) {
      ret.stats = fs.lstatSync(pathname);
    }

    if (contain.includes('type')) {
      ret.type = type;
    }
  }
  return ret;
};

export const nodeFactory = (
  filename: string,
  pathname: string,
  type: Types,
  contain?: Options['contain'],
): Node => {
  return {
    ...leafFactory(filename, pathname, type, contain),
    children: [],
  };
};

export const resolveType = (entry: fs.Dirent | fs.Stats): Types => {
  if (entry.isFile()) return 'file';
  if (entry.isDirectory()) return 'dir';
  if (entry.isSymbolicLink()) return 'symlink';
  if (entry.isBlockDevice()) return 'block-device';
  if (entry.isCharacterDevice()) return 'char-device';
  if (entry.isFIFO()) return 'pipe';
  if (entry.isSocket()) return 'socket';
};

export const shouldTreatAsLeaf = (
  pathname: string,
  type: Types,
  followSymlinks?: boolean,
  rootPath: string = pathname,
): boolean => {
  if (type === 'symlink') {
    if (followSymlinks) {
      const realPath = fs.realpathSync(pathname);
      if (!realPath.startsWith(rootPath)) {
        return shouldTreatAsLeaf(
          realPath,
          resolveType(fs.lstatSync(realPath)),
          followSymlinks,
          rootPath,
        );
      }
    }
    return true;
  }
  if (type === 'file') return true;

  return false;
};
