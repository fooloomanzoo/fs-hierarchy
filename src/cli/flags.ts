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
  'format': flags.string({
    char: 'f',
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
    description:
      'follow symbolic links (cautious: do not use for circular structures)',
  }),
  'contain': flags.string({
    char: 'c',
    description: 'included informations in return object',
    multiple: true,
    options: ['extension', 'path', 'stats', 'type'],
  }),
  'filter': flags.string({
    description: 'filter for path names (glob)',
  }),
  'leaf': flags.string({
    description: 'specify filter for leafs (glob)',
    dependsOn: ['filter'],
  }),
  'node': flags.string({
    description: 'specify filter for nodes (glob)',
    dependsOn: ['filter'],
  }),
  'inverse': flags.boolean({
    description: 'inverse filter',
    dependsOn: ['filter'],
  }),
};
