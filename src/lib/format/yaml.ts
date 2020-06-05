/**
 * Returns a yaml-string for a given json-object.
 *
 * @param obj -   the object
 * @param level - the current intention level of the recursion
 */
const toYAML = (obj: object, level = 0) => {
  let yaml = '';
  const isArray = Array.isArray(obj);
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (obj as any)[key];
    const valueType = Object.prototype.toString.call(value);

    if (!(i === 0 && !isArray)) {
      yaml += '\n';
      yaml += '  '.repeat(level);
    }

    if (isArray) {
      yaml += '- ';
    } else {
      yaml += key + ': ';
    }

    switch (valueType) {
      case '[object Array]':
        if (value.length === 0) {
          yaml += '[]';
          break;
        }
        yaml += toYAML(value as object | Array<any>, level + 1);
        break;
      case '[object Object]':
        if (!isArray) {
          yaml += '\n';
          yaml += '  '.repeat(level + 1);
        }
        yaml += toYAML(value as object | Array<any>, level + 1);
        break;
      case '[object Boolean]':
      case '[object Number]':
        yaml += value as boolean | number;
        break;
      case '[object Date]':
        yaml += '"' + (value as Date).toISOString() + '"';
        break;
      case '[object String]':
        yaml += '"' + (value as string) + '"';
        break;
      default:
        yaml += (value as any) || '';
    }
  }

  return yaml;
};

export default toYAML;
