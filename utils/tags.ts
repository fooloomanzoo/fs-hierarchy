export function replaceTag(
  source: string,
  tag: string,
  body: Record<string, unknown> | string,
) {
  if (
    source.includes(`<!-- ${tag} -->`) &&
    source.includes(`<!-- ${tag}stop -->`)
  ) {
    source = source.replace(
      new RegExp(`<!-- ${tag} -->(.|\n)*<!-- ${tag}stop -->`, 'm'),
      `<!-- ${tag} -->`,
    );
  }

  return source.replace(
    `<!-- ${tag} -->`,
    `<!-- ${tag} -->\n${body}\n<!-- ${tag}stop -->`,
  );
}
