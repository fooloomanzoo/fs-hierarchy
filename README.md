# fs-hierarchy

Create a hierarchy map of a filesystem using node's built-in **fs**. 

You can use the CLI or include it directly in your project.
It returns a structure that can be used in different contexts like for [d3-hierarchy](https://observablehq.com/@d3/d3-hierarchy). 

Additionally it is possible:

-   to include extra informations like the file extension, the absolute path, the type and [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
-   filter paths and names
-   follow symbolic links
-   in CLI: output in json, yaml or in a tree to stdout or file

[![Version](https://img.shields.io/npm/v/fs-hierarchy.svg?style=for-the-badge)](https://npmjs.org/package/fs-hierarchy)
[![Downloads/week](https://img.shields.io/npm/dw/fs-hierarchy.svg?style=for-the-badge)](https://npmjs.org/package/fs-hierarchy)
[![License](https://img.shields.io/npm/l/fs-hierarchy.svg?style=for-the-badge)](https://github.com/fooloomanzoo/fs-hierarchy/blob/master/package.json)

<!-- toc -->

-   [fs-hierarchy](#fs-hierarchy)
-   [CLI](#cli)
-   [Programmatic use](#programmatic-use)
    <!-- tocstop -->

# CLI

Using the CLI, `fs-hierarchy` supports different output formats and options.

## Commands

<!-- commands -->

-   [`fs-hierarchy [DIR] [OUTPUT]`](#fs-hierarchy-dir-output)

## `fs-hierarchy [DIR] [OUTPUT]`

Create a hierarchy map of a filesystem using node's built-in _fs_.

    USAGE
      $ fs-hierarchy  [DIR] [OUTPUT] [-e] [--flat] [-f tree|yaml|json] [-h] [-i ext|path|stats|type] [-m
        <value>] [-M all|none|some] [--minify] [-r <value>] [-s] [-v]

    ARGUMENTS
      DIR     [default: .] path to create a hierarchy from
      OUTPUT  output filename

    FLAGS
      -M, --match-rule=<option>  [default: some] rule for matching paths
                                 <options: all|none|some>
      -e, --empty                include child nodes that have no children
      -f, --format=<option>      [default: json] the used output format
                                 <options: tree|yaml|json>
      -h, --help                 show this help
      -i, --include=<option>...  the included informations in return object
                                 <options: ext|path|stats|type>
      -m, --match=<value>...     filter matching paths
      -r, --root=<value>         the used name for the root-folder
      -s, --symlinks             follow symbolic links
      -v, --version              show the version
          --flat                 flatten the output
          --minify               minify the output

    DESCRIPTION
      Create a hierarchy map of a filesystem using node's built-in *fs*.

    FLAG DESCRIPTIONS
      -M, --match-rule=all|none|some  rule for matching paths

        when set to "all" all filters must resolve successfully,
        when set to "some" at least one filter must resolve successfully,
        when set to "none" no filter must resolve successfully

      -m, --match=<value>...  filter matching paths

        use glob pattern for matching
        negate by leading '!'
        e.g. -m '**/*.ts' '!**/node_modules/**'

      --flat  flatten the output

        if true the full path will be included by default. using tree format the full path will be used instead of the
        filenames

      --minify  minify the output

        only for json format

<!-- commandsstop -->

<!-- output -->
## JSON
 
```shell-script
$ fs-hierarchy ./src -m 'index.ts'
```


```json
{
  "name": "./src",
  "children": [
    {
      "name": "commands",
      "children": [
        {
          "name": "index.ts"
        }
      ]
    },
    {
      "name": "index.ts"
    },
    {
      "name": "lib",
      "children": [
        {
          "name": "index.ts"
        }
      ]
    }
  ]
}

```


## Tree
 
```shell-script
$ fs-hierarchy ./src -f tree -m '*.ts'
```


```
./src
 ├─ commands
 │  ╰─ index.ts
 ├─ index.ts
 ╰─ lib
    ├─ format
    │  ├─ json.ts
    │  ├─ tree.ts
    │  ╰─ yaml.ts
    ├─ hierarchy.ts
    ├─ index.ts
    ├─ types.ts
    ├─ utils
    │  ├─ factories.ts
    │  ├─ flatten.ts
    │  ├─ leaf.ts
    │  ├─ read-dir.ts
    │  ├─ type.ts
    │  ╰─ typeguards.ts
    ╰─ write
       ├─ file.ts
       ╰─ stdout.ts


```


<!-- outputstop -->

## More Examples

-   [Formatting](docs/format.md)
-   [Filter](docs/filter.md)

# Programmatic use

```sh-session
$ npm install fs-hierarchy
```

```javascript
const { hierarchy } = require('fs-hirarchy');

const root = path.resolve(__dirname, 'files');
const options = {
  filter: { match: '*.json' },
  include: { path: true },
  rootName: 'HomeSweetHome'
};

const matches = hierarchy(root, options);
```

<api-readme files="./src/lib/index.ts" />

<!-- START-API-README -->

## hierarchy

**`function`**

Creates a hierarchy tree structure based on the given root path and options.

_defined in [fs-hierarchy/src/lib/hierarchy.ts](https://github.com/fooloomanzoo/fs-hierarchy/tree/master/src/lib/hierarchy.ts#L20)_

**parameters**

| Name       | Type                               | Description                                |
| ---------- | ---------------------------------- | ------------------------------------------ |
| `root*`    | `string`                           | The root path of the hierarchy.            |
| `options*` | [`Options`](#options)              | The options for configuring the hierarchy. |
| `returns`  | [`Leaf`](#leaf) \| [`Node`](#node) | The hierarchy tree structure.              |

## Type

**`union`**

Types of a Leaf or Node entry

_defined in [fs-hierarchy/src/lib/types.ts](https://github.com/fooloomanzoo/fs-hierarchy/tree/master/src/lib/types.ts#L7)_

**values**

`"block-device"` \| `"char-device"` \| `"dir"` \| `"file"` \| `"pipe"` \| `"socket"` \| `"symlink"`

## Leaf

**`type`**

a Leaf of the hierarchy

_defined in [fs-hierarchy/src/lib/types.ts](https://github.com/fooloomanzoo/fs-hierarchy/tree/master/src/lib/types.ts#L19)_

**properties**

| Name        | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `extension` | `string`        | optionally included extension (only for  `Leaf` s)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `name*`     | `string`        | the name of the entry (without the base path)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `path`      | `string`        | optionally included absolute path                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `stats`     | Stats           | A  `fs.Stats`  object provides information about a file.  Objects returned from \[{@link lstat} and {@link fstat](stat},) and their synchronous counterparts are of this type. If  `bigint`  in the  `options`  passed to those methods is true, the numeric values will be  `bigint`  instead of  `number` , and the object will contain additional nanosecond-precision properties suffixed with  `Ns` .     `console Stats {   dev: 2114,   ino: 48064969,   mode: 33188,   nlink: 1,   uid: 85,   gid: 100,   rdev: 0,   size: 527,   blksize: 4096,   blocks: 8,   atimeMs: 1318289051000.1,   mtimeMs: 1318289051000.1,   ctimeMs: 1318289051000.1,   birthtimeMs: 1318289051000.1,   atime: Mon, 10 Oct 2011 23:24:11 GMT,   mtime: Mon, 10 Oct 2011 23:24:11 GMT,   ctime: Mon, 10 Oct 2011 23:24:11 GMT,   birthtime: Mon, 10 Oct 2011 23:24:11 GMT } `      `bigint`  version:     `console BigIntStats {   dev: 2114n,   ino: 48064969n,   mode: 33188n,   nlink: 1n,   uid: 85n,   gid: 100n,   rdev: 0n,   size: 527n,   blksize: 4096n,   blocks: 8n,   atimeMs: 1318289051000n,   mtimeMs: 1318289051000n,   ctimeMs: 1318289051000n,   birthtimeMs: 1318289051000n,   atimeNs: 1318289051000000000n,   mtimeNs: 1318289051000000000n,   ctimeNs: 1318289051000000000n,   birthtimeNs: 1318289051000000000n,   atime: Mon, 10 Oct 2011 23:24:11 GMT,   mtime: Mon, 10 Oct 2011 23:24:11 GMT,   ctime: Mon, 10 Oct 2011 23:24:11 GMT,   birthtime: Mon, 10 Oct 2011 23:24:11 GMT } `    |
| `type`      | [`Type`](#type) | Types of a Leaf or Node entry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

## Node

**`type`**

a Node of the hierarchy

_defined in [fs-hierarchy/src/lib/types.ts](https://github.com/fooloomanzoo/fs-hierarchy/tree/master/src/lib/types.ts#L45)_

**properties**

| Name        | Type                                    | Parent          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------- | --------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children*` | (([`Leaf`](#leaf), [`Node`](#node)))\[] |                 | children of the  `Node`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `stats`     | Stats                                   | [`Leaf`](#leaf) | A  `fs.Stats`  object provides information about a file.  Objects returned from \[{@link lstat} and {@link fstat](stat},) and their synchronous counterparts are of this type. If  `bigint`  in the  `options`  passed to those methods is true, the numeric values will be  `bigint`  instead of  `number` , and the object will contain additional nanosecond-precision properties suffixed with  `Ns` .     `console Stats {   dev: 2114,   ino: 48064969,   mode: 33188,   nlink: 1,   uid: 85,   gid: 100,   rdev: 0,   size: 527,   blksize: 4096,   blocks: 8,   atimeMs: 1318289051000.1,   mtimeMs: 1318289051000.1,   ctimeMs: 1318289051000.1,   birthtimeMs: 1318289051000.1,   atime: Mon, 10 Oct 2011 23:24:11 GMT,   mtime: Mon, 10 Oct 2011 23:24:11 GMT,   ctime: Mon, 10 Oct 2011 23:24:11 GMT,   birthtime: Mon, 10 Oct 2011 23:24:11 GMT } `      `bigint`  version:     `console BigIntStats {   dev: 2114n,   ino: 48064969n,   mode: 33188n,   nlink: 1n,   uid: 85n,   gid: 100n,   rdev: 0n,   size: 527n,   blksize: 4096n,   blocks: 8n,   atimeMs: 1318289051000n,   mtimeMs: 1318289051000n,   ctimeMs: 1318289051000n,   birthtimeMs: 1318289051000n,   atimeNs: 1318289051000000000n,   mtimeNs: 1318289051000000000n,   ctimeNs: 1318289051000000000n,   birthtimeNs: 1318289051000000000n,   atime: Mon, 10 Oct 2011 23:24:11 GMT,   mtime: Mon, 10 Oct 2011 23:24:11 GMT,   ctime: Mon, 10 Oct 2011 23:24:11 GMT,   birthtime: Mon, 10 Oct 2011 23:24:11 GMT } `    |
| `type`      | [`Type`](#type)                         | [`Leaf`](#leaf) | Types of a Leaf or Node entry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `name*`     | `string`                                | [`Leaf`](#leaf) | the name of the entry (without the base path)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `path`      | `string`                                | [`Leaf`](#leaf) | optionally included absolute path                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

## Hierarchy

**`union`**

_defined in [fs-hierarchy/src/lib/types.ts](https://github.com/fooloomanzoo/fs-hierarchy/tree/master/src/lib/types.ts#L53)_

**values**

[`Leaf`](#leaf) \| [`Node`](#node)

## MatchOptions

**`type`**

\`minimatch\` options for filtering (https&#x3A;//github.com/isaacs/minimatch#options)

_defined in [fs-hierarchy/src/lib/types.ts](https://github.com/fooloomanzoo/fs-hierarchy/tree/master/src/lib/types.ts#L58)_

**properties**

| Name                      | Type                                                                                                                                               | Parent             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `dot`                     | `boolean`                                                                                                                                          |                    |
| `matchBase`               | `boolean`                                                                                                                                          |                    |
| `nobrace`                 | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `nocomment`               | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `nonegate`                | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `debug`                   | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `noglobstar`              | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `noext`                   | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `nonull`                  | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `windowsPathsNoEscape`    | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `allowWindowsEscape`      | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `partial`                 | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `nocase`                  | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `nocaseMagicOnly`         | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `magicalBraces`           | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `flipNegate`              | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `preserveMultipleSlashes` | `boolean`                                                                                                                                          | `MinimatchOptions` |
| `optimizationLevel`       | `number`                                                                                                                                           | `MinimatchOptions` |
| `platform`                | `"aix"` \| `"android"` \| `"darwin"` \| `"freebsd"` \| `"haiku"` \| `"linux"` \| `"openbsd"` \| `"sunos"` \| `"win32"` \| `"cygwin"` \| `"netbsd"` | `MinimatchOptions` |
| `windowsNoMagicRoot`      | `boolean`                                                                                                                                          | `MinimatchOptions` |

## MatchRule

**`union`**

The logical rule how filter patterns should be applied  when set to \`all\` all filters must resolve successfully, when set to \`some\` at least one filter must resolve successfully, when set to \`none\` no filter must resolve successfully

_defined in [fs-hierarchy/src/lib/types.ts](https://github.com/fooloomanzoo/fs-hierarchy/tree/master/src/lib/types.ts#L72)_

**values**

`"all"` \| `"none"` \| `"some"`

## Options

**`type`**

Use the options when you want to filter the resulting Hierarchy object or want to include extra informations.

_defined in [fs-hierarchy/src/lib/types.ts](https://github.com/fooloomanzoo/fs-hierarchy/tree/master/src/lib/types.ts#L77)_

**properties**

| Name       | Type                                                                                                                                                                                                                 | Description                                     |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `filter`   | <details><summary>`type`</summary><blockquote>`empty`: `boolean`<br />`match`: `string` \| `string`\[]<br />`options`: [`MatchOptions`](#matchoptions)<br />`rule`: [`MatchRule`](#matchrule)</blockquote></details> | filter options the resulting Hierarchy object   |
| `flatten`  | `boolean`                                                                                                                                                                                                            | when  `true` , the hierarchy will be flattened. |
| `include`  | <details><summary>`type`</summary><blockquote>`extension`: `boolean`<br />`pathname`: `boolean`<br />`stats`: `boolean`<br />`type`: `boolean`</blockquote></details>                                                | included in the return object                   |
| `rootName` | `string`                                                                                                                                                                                                             | the used text of the root node                  |
| `symlinks` | `boolean`                                                                                                                                                                                                            | when  `true` , symlinks are followed            |

<!-- END-API-README -->
