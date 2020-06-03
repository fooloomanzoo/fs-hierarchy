#!/usr/bin/env ts-node

import { Command } from '@oclif/command';
import * as path from 'path';
import * as globToRegExp from 'glob-to-regexp';
import type { Options } from '../hierarchy/types';

import Flags from './flags';
import Args from './args';
import hierarchy from '../hierarchy';
import { toJSONP, toTree, toYAML } from '../format';
import { toFile, toStdOut } from '../write';

export = class FsHierarchyCLI extends Command {
  static description = 'create a hierarchy map of files and folders';

  static flags = Flags;

  static args = Args;

  static create = hierarchy;

  async run() {
    const { args, flags } = this.parse(FsHierarchyCLI);
    let formatter;
    let writer = toStdOut;

    const result = hierarchy(args.path, {
      contain: flags.contain as Options['contain'],
      inverse: flags.inverse,
      filter: flags.filter ? globToRegExp(flags.filter) : undefined,
      followSymlinks: flags['follow-symlinks'],
      leafFilter: flags.leaf ? globToRegExp(flags.leaf) : undefined,
      nodeFilter: flags.node ? globToRegExp(flags.node) : undefined,
      rootName: flags['root-name'],
    });

    switch (flags.format.toLowerCase()) {
      case 'tree':
        formatter = toTree;
        break;
      case 'yaml':
        formatter = toYAML;
        break;
      case 'json':
      default:
        formatter = toJSONP;
    }

    if (args.output) {
      writer = toFile(args.output);
      const extension = path.extname(args.output).toLowerCase();

      switch (extension) {
        case '.yml':
        case '.yaml':
          formatter = toYAML;
          break;
        case '.json':
          formatter = toJSONP;
          break;
      }
    }

    writer(formatter(result));
  }
};
