/**
 * A function to write to stdout
 *
 * @param content - the content to be given out
 */
const toStdOut = (content: string | Buffer) => {
  process.stdout.write(content);
  process.stdout.write('\n');
};

export default toStdOut;
