const toStdOut = (content: string) => {
  process.stdout.write(content);
  process.stdout.write('\n');
};

export default toStdOut;
