const toYAML = (obj: object, level = 0) => {
  let yaml = '';
  const isArray = Array.isArray(obj);
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = (obj as any)[key] as any;
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
        yaml += value;
        break;
      case '[object Date]':
        yaml += '"' + value.toString() + '"';
        break;
      case '[object String]':
        yaml += '"' + value + '"';
        break;
      default:
        yaml += value || '';
    }
  }

  return yaml;
};

export default toYAML;
