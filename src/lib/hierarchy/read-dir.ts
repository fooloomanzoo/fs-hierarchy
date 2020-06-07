import * as fs from 'fs';
import * as path from 'path';
import { IMinimatch } from 'minimatch';
import type { Node, Options } from '../../types';
import {
  leafFactory,
  nodeFactory,
  resolveType,
  shouldTreatAsLeaf,
} from './factories';

/**
 * Reads a directory recursively.
 *
 * @param pathname -  the absolute path of the node
 * @param hierarchy - the recursivly applied **hierarchy**-structure
 * @param options -   the given options
 * @param rootPath -  the path to the given root (set by default at the first iteration)
 *
 * @returns the **Node**-structure or null (if optional *noEmptyChildNodes* is set to true and there are no children)
 */
export const readdirRecursive = (
  pathname: string,
  hierarchy: Node,
  options: Options,
  minimatcher?: IMinimatch,
  rootPath: string = pathname,
): Node | null => {
  const node = fs
    .readdirSync(pathname, { withFileTypes: true })
    .reduce((result: Node, entry: fs.Dirent) => {
      const type = resolveType(entry);
      const resolvedPath = path.resolve(pathname, entry.name);

      if (
        shouldTreatAsLeaf(resolvedPath, type, options.followSymlinks, rootPath)
      ) {
        // optionally apply filter to the path of a leaf
        if (minimatcher && !minimatcher.match(resolvedPath)) {
          return result;
        }

        result.children.push(
          leafFactory(entry.name, resolvedPath, type, options.include),
        );
      } else {
        const child = readdirRecursive(
          resolvedPath,
          nodeFactory(entry.name, resolvedPath, type, options.include),
          options,
          minimatcher,
          rootPath,
        );
        if (child) {
          result.children.push(child);
        }
      }

      return result;
    }, hierarchy);

  // optionally return **null** if there are no children
  if (options?.filter?.noEmpty && node.children.length === 0) {
    return null;
  }

  return node;
};
