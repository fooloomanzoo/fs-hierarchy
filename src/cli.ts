import { Command, flags } from '@oclif/command';
import create from './hierarchy';

export default class FsHierarchy extends Command {
  static description = 'create a hierarchy map of files and folders';

  private static _flags = {
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

  static args = [
    {
      name: 'folder',
      required: false,
      description: 'folder to create a hierarchy from',
      default: '.',
    },
  ];

  async run() {
    const { args, flags } = this.parse(FsHierarchy);

    this.log(`hello ${flags.rootName} from ./src/index.ts`);

    if (args.folder) {
      this.log(
        `you input --force and --file: ${JSON.stringify(
          create(args.folder, flags.rootName),
        )}`,
      );
    }
  }
}
