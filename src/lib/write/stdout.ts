/**
 * A function to write to stdout
 *
 * @param content - the content to be given out
 */
export function toStdOut(content: Buffer | string) {
  process.stdout.write(content);
  process.stdout.write('\n');
}
