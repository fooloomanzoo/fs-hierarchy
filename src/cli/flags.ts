import { flags } from '@oclif/command';

export default {
  'help': flags.help({
    char: 'h',
    description: 'show this help',
  }),
  'version': flags.version({
    char: 'v',
    description: 'show version',
  }),
  'output': flags.string({
    char: 'o',
    description: 'used output filename',
  }),
  'root-name': flags.string({
    char: 'r',
    default: '/',
    description: 'used name for the root-folder',
  }),
  'follow-symlinks': flags.boolean({
    char: 's',
    default: false,
    description:
      'follow symbolic links (cautious: do not use for circular structures)',
  }),
  'include': flags.string({
    char: 'i',
    default: ['path'],
    description: 'include in return object',
    multiple: true,
    options: ['extension', 'path', 'stats', 'type'],
  }),
  'filter': flags.string({
    char: 'f',
    description: 'filter for path names (glob)',
  }),
  'leaf-filter': flags.string({
    char: 'l',
    description: 'specify filter for leafs (glob)',
  }),
  'node-filter': flags.string({
    char: 'n',
    description: 'specify filter for nodes (glob)',
  }),
  'inverse': flags.boolean({
    description: 'inverse filter',
    dependsOn: ['filter'],
  }),
};
