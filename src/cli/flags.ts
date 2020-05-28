import { flags } from '@oclif/command';

export default {
  help: flags.help({
    char: 'h',
    description: 'show this help',
  }),
  version: flags.version({
    char: 'v',
    description: 'show version',
  }),
  output: flags.string({
    char: 'o',
    description: 'used output filename',
    multiple: false,
  }),
  rootName: flags.string({
    char: 'n',
    description: 'used name for the root-folder',
    multiple: false,
    default: '',
  }),
  followSymlinks: flags.boolean({
    description: 'follow symlinks',
  }),
};
