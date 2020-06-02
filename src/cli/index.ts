#!/usr/bin/env ts-node

import { Command } from '@oclif/command';
import * as globToRegExp from 'glob-to-regexp';

import Flags from './flags';
import Args from './args';

import { Options } from '../hierarchy/types';
import create = require('../hierarchy');

class FsHierarchyCLI extends Command {
  static description = 'create a hierarchy map of files and folders';

  static flags = Flags;

  static args = Args;

  static create = create;

  async run() {
    const { args, flags } = this.parse(FsHierarchyCLI);

    const hierarchy = create(args.path, flags['root-name'], {
      include: flags.include as Options['include'],
      inverse: flags.inverse,
      filter: flags.filter ? globToRegExp(flags.filter) : undefined,
      followSymlinks: flags['follow-symlinks'],
      leafFilter: flags['leaf-filter']
        ? globToRegExp(flags['leaf-filter'])
        : undefined,
      nodeFilter: flags['node-filter']
        ? globToRegExp(flags['node-filter'])
        : undefined,
      rootName: flags['root-name'],
    });

    process.stdout.write(JSON.stringify(hierarchy, null, 2));
    process.stdout.write('\n');
  }
}

export = FsHierarchyCLI;
