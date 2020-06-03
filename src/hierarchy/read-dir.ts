import * as fs from 'fs';
import * as path from 'path';
import { Node, Options } from './types';
import { leafFactory, nodeFactory, resolveType, isLeaf } from './factories';

export const readdirRecursive = (
  pathname: string,
  hierarchy: Node,
  options?: Options,
  rootPath: string = pathname,
): Node => {
  return fs
    .readdirSync(pathname, { withFileTypes: true })
    .reduce((result: Node, entry: fs.Dirent) => {
      const type = resolveType(entry);
      const resolvedPath = path.resolve(pathname, entry.name);

      if (
        options?.filter &&
        (options.inverse
          ? resolvedPath.match(options.filter)
          : !resolvedPath.match(options.filter))
      )
        return result;

      if (isLeaf(resolvedPath, type, options?.followSymlinks, rootPath)) {
        if (
          options?.leafFilter &&
          (options.inverse
            ? entry.name.match(options.leafFilter)
            : !entry.name.match(options.leafFilter))
        )
          return result;
        result.children.push(
          leafFactory(entry.name, resolvedPath, type, options?.contain),
        );
      } else {
        if (
          options?.nodeFilter &&
          (options.inverse
            ? entry.name.match(options.nodeFilter)
            : !entry.name.match(options.nodeFilter))
        )
          return result;
        result.children.push(
          readdirRecursive(
            resolvedPath,
            nodeFactory(entry.name, resolvedPath, type, options?.contain),
            options,
            rootPath,
          ),
        );
      }

      return result;
    }, hierarchy);
};
