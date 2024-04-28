import * as fs from 'node:fs';

import type { Type } from '../../types.js';

/**
 * Resolves the type of an entry given by *fs*.
 *
 * @param entry - an entry given by various *fs*-functions
 *
 * @returns the type of the entry
 */

export const resolveType = (entry: fs.Dirent | fs.Stats): Type => {
  if (entry.isFile()) return 'file';
  if (entry.isDirectory()) return 'dir';
  if (entry.isSymbolicLink()) return 'symlink';
  if (entry.isBlockDevice()) return 'block-device';
  if (entry.isCharacterDevice()) return 'char-device';
  if (entry.isFIFO()) return 'pipe';
  if (entry.isSocket()) return 'socket';
};
