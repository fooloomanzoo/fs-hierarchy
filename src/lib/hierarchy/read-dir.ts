import * as fs from 'fs';
import * as path from 'path';
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
  rootPath: string = pathname,
): Node | null => {
  const node = fs
    .readdirSync(pathname, { withFileTypes: true })
    .reduce((result: Node, entry: fs.Dirent) => {
      const type = resolveType(entry);
      const resolvedPath = path.resolve(pathname, entry.name);

      // optionally apply filter to the absolute path of the child
      if (
        options?.filter &&
        (options.inverse
          ? resolvedPath.match(options.filter)
          : !resolvedPath.match(options.filter))
      ) {
        return result;
      }

      if (
        shouldTreatAsLeaf(resolvedPath, type, options.followSymlinks, rootPath)
      ) {
        // optionally apply filter to the name of a leaf
        if (
          options?.leafFilter &&
          (options.inverse
            ? entry.name.match(options.leafFilter)
            : !entry.name.match(options.leafFilter))
        ) {
          return result;
        }

        result.children.push(
          leafFactory(entry.name, resolvedPath, type, options.include),
        );
      } else {
        // optionally apply filter to the name of a node
        if (
          options?.nodeFilter &&
          (options.inverse
            ? entry.name.match(options.nodeFilter)
            : !entry.name.match(options.nodeFilter))
        ) {
          return result;
        }

        const child = readdirRecursive(
          resolvedPath,
          nodeFactory(entry.name, resolvedPath, type, options.include),
          options,
          rootPath,
        );
        if (child) {
          result.children.push(child);
        }
      }

      return result;
    }, hierarchy);

  // optionally return **null** if there are no children
  if (options?.noEmptyChildNodes && node.children.length === 0) {
    return null;
  }
  return node;
};
