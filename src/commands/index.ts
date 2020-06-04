#!/usr/bin/env ts-node

import { Command } from '@oclif/command';
import { flags } from '@oclif/command';
import * as path from 'path';
import * as globToRegExp from 'glob-to-regexp';
import type { Options } from '../lib/types';

import hierarchy from '../lib/hierarchy';
import { toJSONP, toTree, toYAML } from '../lib/format';
import { toFile, toStdOut } from '../lib/write';

class FsHierarchyCLI extends Command {
  create = hierarchy;

  async run() {
    const { args, flags } = this.parse(FsHierarchyCLI);
    let formatter;
    let writer = toStdOut;

    const result = this.create(args.path, {
      contain: flags.contain as Options['contain'],
      inverse: flags.inverse,
      filter: flags.filter ? globToRegExp(flags.filter) : undefined,
      followSymlinks: flags['follow-symlinks'],
      leafFilter: flags.leaf ? globToRegExp(flags.leaf) : undefined,
      nodeFilter: flags.node ? globToRegExp(flags.node) : undefined,
      noEmptyChildNodes: flags['no-empty-nodes'],
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
}

FsHierarchyCLI.description = 'create a hierarchy map of files and folders';

FsHierarchyCLI.args = [
  {
    name: 'path',
    required: false,
    description: 'path to create a hierarchy from',
    default: '.',
  },
  {
    name: 'output',
    required: false,
    description: 'output filename',
  },
];

FsHierarchyCLI.flags = {
  'help': flags.help({
    char: 'h',
    description: 'show this help',
  }),
  'version': flags.version({
    char: 'v',
    description: 'show version',
  }),
  'format': flags.string({
    char: 'o',
    default: 'json',
    description: 'output format',
    options: ['json', 'tree', 'yaml'],
  }),
  'root-name': flags.string({
    char: 'n',
    description: 'used name for the root-folder',
  }),
  'follow-symlinks': flags.boolean({
    char: 's',
    default: false,
    description: 'follow symbolic links',
  }),
  'contain': flags.string({
    char: 'c',
    description: 'included informations in return object',
    multiple: true,
    options: ['ext', 'path', 'stats', 'type'],
  }),
  'use-filter': flags.boolean({
    char: 'f',
    description: 'enable filters',
  }),
  'filter': flags.string({
    description: 'filter for all absolute path names (glob)',
    dependsOn: ['use-filter'],
  }),
  'leaf': flags.string({
    description: 'specify filter for leaf names (glob)',
    dependsOn: ['use-filter'],
  }),
  'node': flags.string({
    description: 'specify filter for node names (glob)',
    dependsOn: ['use-filter'],
  }),
  'inverse': flags.boolean({
    description: 'inverse filter',
    dependsOn: ['use-filter'],
  }),
  'no-empty-nodes': flags.boolean({
    description: 'filter child nodes that have no children',
  }),
};

export = FsHierarchyCLI;
