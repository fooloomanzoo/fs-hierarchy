import { Args, Command, Flags } from '@oclif/core';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { toJSON } from '../lib/format/json.js';
import { toTree } from '../lib/format/tree.js';
import { toYAML } from '../lib/format/yaml.js';
import { hierarchy } from '../lib/hierarchy.js';
import { Hierarchy, MatchRule } from '../lib/types.js';
import { toFile } from '../lib/write/file.js';
import { toStdOut } from '../lib/write/stdout.js';

export default class Index extends Command {
  static args = {
    dir: Args.string({
      default: '.',
      description: 'path to create a hierarchy from',
      required: false,
    }),
    output: Args.string({
      description: 'output filename',
      required: false,
    }),
  };

  static description =
    "Create a hierarchy map of a filesystem using node's built-in *fs*.";

  static flags = {
    'empty': Flags.boolean({
      char: 'e',
      summary: 'include child nodes that have no children',
    }),
    'flat': Flags.boolean({
      aliases: ['flatten'],
      default: false,
      description:
        'if true the full path will be included by default. using tree format the full path will be used instead of the filenames',
      summary: 'flatten the output',
    }),
    'format': Flags.string({
      char: 'f',
      default: 'json',
      options: ['tree', 'yaml', 'json'],
      summary: 'the used output format',
    }),
    'help': Flags.help({
      char: 'h',
      description: undefined,
      summary: 'show this help',
    }),
    'include': Flags.string({
      char: 'i',
      multiple: true,
      options: ['ext', 'path', 'stats', 'type'],
      summary: 'the included informations in return object',
    }),
    'match': Flags.string({
      char: 'm',
      description: `use glob pattern for matching
        negate by leading '!'
        e.g. -m '**/*.ts' '!**/node_modules/**'`,
      multiple: true,
      parse: async m => m.replaceAll('\\!', '!'),
      summary: 'filter matching paths',
    }),
    'match-rule': Flags.string({
      char: 'M',
      default: 'some',
      description: `when set to "all" all filters must resolve successfully,
        when set to "some" at least one filter must resolve successfully,
        when set to "none" no filter must resolve successfully`,
      options: ['all', 'none', 'some'],
      summary: 'rule for matching paths',
    }),
    'minify': Flags.boolean({
      aliases: ['min'],
      default: false,
      description: 'only for json format',
      relationships: [
        {
          flags: [
            {
              name: 'format',
              when: async flags => flags.format === 'json',
            },
          ],
          type: 'all',
        },
      ],
      summary: 'minify the output',
    }),
    'root': Flags.string({
      char: 'r',
      summary: 'the used name for the root-folder',
    }),
    'symlinks': Flags.boolean({
      char: 's',
      default: false,
      summary: 'follow symbolic links',
    }),
    'version': Flags.version({
      char: 'v',
      description: undefined,
      summary: 'show the version',
    }),
  };

  public async run() {
    const { args, flags } = await this.parse(Index);
    const { empty, flat, format, include, match, minify, root, symlinks } =
      flags;
    const included = include?.length
      ? {
          extension: include?.includes('ext'),
          pathname: include?.includes('path'),
          stats: include?.includes('stats'),
          type: include?.includes('type'),
        }
      : { pathname: flat };

    let formatter: (h: Hierarchy, flatten?: boolean) => string;
    let writer = toStdOut;

    switch (format) {
      case 'yaml': {
        formatter = (h: Hierarchy) => toYAML(h);
        break;
      }

      case 'tree': {
        formatter = toTree;
        break;
      }

      default: {
        formatter = toJSON(minify ? 0 : 2);
        break;
      }
    }

    if (args.output) {
      writer = toFile(args.output);
      const extension = path.extname(args.output).toLowerCase();

      switch (extension) {
        case '.yml':
        case '.yaml': {
          formatter = (h: Hierarchy) => toYAML(h);
          break;
        }

        case '.json': {
          if (!['json', 'json-min'].includes(format)) {
            formatter = toJSON(2);
          }

          break;
        }
      }
    }

    try {
      await fs.promises.access(path.resolve(args.dir));
    } catch (error) {
      this.error(error as Error);
    }

    const result = await hierarchy(args.dir, {
      filter: {
        ...(match ? { match, rule: flags['match-rule'] as MatchRule } : {}),
        ...(empty ? { empty: true } : {}),
      },
      flatten: flat,
      include: included,
      rootName: root,
      symlinks,
    });

    writer(formatter(result, flat));
  }
}
