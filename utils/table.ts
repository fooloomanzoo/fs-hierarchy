function createType(entry) {
  if ('type' in entry) {
    return `${entry.type}${'default' in entry ? '' : ` (\`${entry.default}\`)`}`;
  }

  if ('$ref' in entry) {
    return `[${entry.$ref.replace('#/definitions/', '')}](${entry.$ref.replace(
      '/definitions/',
      '',
    )})`;
  }

  return '';
}

function createAnyOf(entries) {
  return entries.map(entry => createType(entry)).join(', ');
}

function createEntry(key, entry, required = false) {
  let row = `${key} | ${required ? '☐' : '☑'} | ${createType(entry) || createAnyOf(entry.anyOf) || '─'} | ${(entry.description || '').replaceAll(/\s/g, ' ') || '─'}`;
  if (entry.properties) {
    // eslint-disable-next-line guard-for-in
    for (const p in entry.properties) {
      row += '\n' + createEntry(`*${key}*.${p}`, entry.properties[p]);
    }
  }

  return row;
}

export function createSchemaTable(schema, title) {
  return `${title}
${schema.description || ''}
${schema.anyOf ? createAnyOf(schema.anyOf) : ''}
${schema.enum ? schema.enum.map(e => `* \`${e}\``).join('\n') : ''}
${
  schema.properties
    ? `name | optional | type | description 
--- | --- | --- | ---
${Object.entries(schema.properties)
  .map(([key, entry]) =>
    createEntry(key, entry, schema.required && schema.required.includes(key)),
  )
  .join('\n')}`
    : ''
}`;
}
