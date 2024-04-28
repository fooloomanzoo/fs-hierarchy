/**
 * Returns a yaml-string for a given json-object.
 *
 * @param obj -   the object
 * @param level - the current intention level of the recursion
 */
export const toYAML = (obj: Array<unknown> | object, level = 0) => {
  let yaml = '';
  let i = 0;
  const isArray = Array.isArray(obj);
  const keys = Object.keys(obj);

  for (const key of keys) {
    const value = (obj as Record<string, unknown>)[key];
    const valueType = Object.prototype.toString.call(value);

    if (!(i === 0 && !isArray)) {
      yaml += '\n';
      yaml += '  '.repeat(level);
    }

    yaml += isArray ? '- ' : key + ': ';

    switch (valueType) {
      case '[object Array]': {
        if ((value as Array<unknown>).length === 0) {
          yaml += '[]';
          break;
        }

        yaml += toYAML(value as Array<unknown> | object, level + 1);
        break;
      }

      case '[object Object]': {
        if (!isArray) {
          yaml += '\n';
          yaml += '  '.repeat(level + 1);
        }

        yaml += toYAML(value as Array<unknown> | object, level + 1);
        break;
      }

      case '[object Boolean]':
      case '[object Number]': {
        yaml += value as boolean | number;
        break;
      }

      case '[object Date]': {
        yaml += '"' + (value as Date).toISOString() + '"';
        break;
      }

      case '[object String]': {
        yaml += '"' + (value as string) + '"';
        break;
      }

      default: {
        yaml += value || '';
      }
    }

    i++;
  }

  return yaml;
};
