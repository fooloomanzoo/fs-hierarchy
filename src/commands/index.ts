#!/usr/bin/env ts-node

import { Command } from '@oclif/command';
import { flags } from '@oclif/command';
import cli from 'cli-ux';
import * as fs from 'fs';
import * as path from 'path';
import * as globToRegExp from 'glob-to-regexp';

import { hierarchy } from '../lib/hierarchy';
import { toJSON, toTree, toYAML } from '../lib/format';
import { toFile, toStdOut } from '../lib/write';

export = class FsHierarchyCLI extends Command {
  static description =
    "Create a hierarchy map of a filesystem using node's built-in *fs*.";

  static generateHierarchy = hierarchy;

  static args = [
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

  static flags = {
    'help': flags.help({
      char: 'h',
      description: 'show this help',
    }),
    'version': flags.version({
      char: 'v',
      description: 'show the version',
    }),
    'format': flags.string({
      char: 'o',
      default: 'json',
      description:
        'used output format (overwritten if the the output path has a json- or yml/yaml-extension)',
      options: ['json', 'tree', 'yaml'],
    }),
    'root-name': flags.string({
      char: 'n',
      description: 'the used name for the root-folder',
    }),
    'follow-symlinks': flags.boolean({
      char: 's',
      default: false,
      description: 'follow symbolic links',
    }),
    'include': flags.string({
      char: 'i',
      description: 'the included informations in return object',
      multiple: true,
      options: ['ext', 'path', 'stats', 'type'],
    }),
    'use-filter': flags.boolean({
      char: 'f',
      description: 'use to enable filtering',
    }),
    'filter': flags.string({
      description: 'the filter for all absolute path names (glob)',
      dependsOn: ['use-filter'],
    }),
    'leaf': flags.string({
      description: 'specify the filter for leaf names (glob)',
      dependsOn: ['use-filter'],
    }),
    'node': flags.string({
      description: 'specify the filter for node names (glob)',
      dependsOn: ['use-filter'],
    }),
    'inverse': flags.boolean({
      description: 'inverse the filters',
      dependsOn: ['use-filter'],
    }),
    'no-empty-nodes': flags.boolean({
      description: 'to filter child nodes that have no children',
    }),
  };

  async run() {
    const { args, flags } = this.parse(FsHierarchyCLI);
    let formatter;
    let writer = toStdOut;

    switch (flags.format.toLowerCase()) {
      case 'tree':
        formatter = toTree;
        break;
      case 'yaml':
        formatter = toYAML;
        break;
      case 'json':
      default:
        formatter = toJSON(2);
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
          formatter = toJSON();
          break;
      }
    }

    try {
      await fs.promises.access(path.resolve(args.path));
    } catch (error) {
      this.error(error);
    }

    cli.action.start('create hierarchy');

    const result = await FsHierarchyCLI.generateHierarchy(args.path, {
      include: {
        withExtension: flags.include?.includes('ext'),
        withPath: flags.include?.includes('path'),
        withStats: flags.include?.includes('stats'),
        withType: flags.include?.includes('type'),
      },
      inverse: flags.inverse,
      filter: flags.filter ? globToRegExp(flags.filter) : undefined,
      followSymlinks: flags['follow-symlinks'],
      leafFilter: flags.leaf ? globToRegExp(flags.leaf) : undefined,
      nodeFilter: flags.node ? globToRegExp(flags.node) : undefined,
      noEmptyChildNodes: flags['no-empty-nodes'],
      rootName: flags['root-name'],
    });
    cli.action.stop();

    cli.action.start('write results');
    writer(formatter(result));
    cli.action.stop();
  }
};
