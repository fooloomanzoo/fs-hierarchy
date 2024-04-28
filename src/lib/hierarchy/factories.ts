import * as fs from 'node:fs';
import * as path from 'node:path';

import type { Leaf, Node, Options, Type } from '../types.js';

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
export function leaf(
  name: string,
  pathname: string,
  type: Type,
  include: Options['include'] = {},
): Leaf {
  const ret: Leaf = {
    name,
  };

  if (include.pathname) {
    ret.path = pathname;
  }

  if (include.extension) {
    ret.extension = path.extname(pathname);
  }

  if (include.type) {
    ret.type = type;
  }

  if (include.stats) {
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
export function node(
  name: string,
  pathname: string,
  type: Type,
  include: Options['include'] = {},
): Node {
  return {
    ...leaf(name, pathname, type, { ...include, extension: false }),
    children: [],
  };
}
