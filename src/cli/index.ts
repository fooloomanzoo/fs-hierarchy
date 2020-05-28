import { Command } from '@oclif/command';

import create from '../hierarchy';

import Flags from './flags';
import Args from './args';

export default class FsHierarchyCLI extends Command {
  static description = 'create a hierarchy map of files and folders';

  static flags = Flags;

  static args = Args;

  async run() {
    const { args, flags } = this.parse(FsHierarchyCLI);

    process.stdout.write(
      JSON.stringify(create(args.folder, flags.rootName), null, 2),
    );
    process.stdout.write('\n');
  }
}
