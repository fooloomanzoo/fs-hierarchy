fs-hierarchy
============

Create a hierarchy map of a filesystem using node's built-in **fs**. 

You can use the CLI or include it directly in your project.
It returns a structure that can be used in different contexts like for [d3-hierarchy](https://observablehq.com/@d3/d3-hierarchy). 

Additionally it is possible:
* to include extra informations like the file extension, the absolute path, the type and [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
* filter paths and names
* follow symbolic links
* in CLI: output in json, yaml or in a tree to stdout or file

[![Version](https://img.shields.io/npm/v/fs-hierarchy.svg?style=for-the-badge)](https://npmjs.org/package/fs-hierarchy)
[![Downloads/week](https://img.shields.io/npm/dw/fs-hierarchy.svg?style=for-the-badge)](https://npmjs.org/package/fs-hierarchy)
[![License](https://img.shields.io/npm/l/fs-hierarchy.svg?style=for-the-badge)](https://github.com/fooloomanzoo/fs-hierarchy/blob/master/package.json)

<!-- toc -->
* [Programmatic use](#programmatic-use)
* [Structures](#structures)
<!-- tocstop -->
  
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

Using the CLI, `fs-hierarchy` supports different output formats and options.

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
    ├─ hierarchy
    │  ├─ factories.ts
    │  ├─ hierarchy.ts
    │  ├─ read-dir.ts
    │  ╰─ utils
    │     ├─ flatten.ts
    │     ├─ leaf.ts
    │     ╰─ type.ts
    ├─ typeguards.ts
    ├─ types.ts
    ╰─ write
       ├─ file.ts
       ╰─ stdout.ts


```


<!-- outputstop -->

## Commands
<!-- commands -->
* [`fs-hierarchy [DIR] [OUTPUT]`](#fs-hierarchy-dir-output)

## `fs-hierarchy [DIR] [OUTPUT]`

Create a hierarchy map of a filesystem using node's built-in *fs*.

```
USAGE
  $ fs-hierarchy  [DIR] [OUTPUT] [-e] [--flat] [-f tree|yaml|json] [-h] [-i ext|path|stats|type] [-m
    <value>] [--minify] [-r <value>] [-s] [-v]

ARGUMENTS
  DIR     [default: .] path to create a hierarchy from
  OUTPUT  output filename

FLAGS
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
  -m, --match=<value>...  filter matching paths

    use glob pattern for matching
    negate by leading '!'
    one of options have to match so the found is included
    e.g. -m '**/*.ts' '!**/node_modules/**'

  --flat  flatten the output

    if true the full path will be included by default. using tree format the full path will be used instead of the
    filenames

  --minify  minify the output

    only for json format
```
<!-- commandsstop -->

<!-- Options -->
## Options
Use the options if you want to filter the resulting [hierarchy](#Hierarchy) object or want to include extra informations.


name | optional | type | description 
--- | --- | --- | ---
filter | ☑ | object | use glob filter for the found [Leaf](#Leaf)s or the [Node](#Node)s. [minimatch](https://github.com/isaacs/minimatch) is used, have a look at the [differences](https://github.com/isaacs/minimatch#comparisons-to-other-fnmatchglob-implementations)
*filter*.match | ☑ | string | glob filter for the absolute path of the found [Node](#Node)s (negate by leading **!**)
*filter*.noEmpty | ☑ | boolean | if true and a [Node](#Node) has no children, the node will be not returned
*filter*.options | ☑ | [MinimatchOptions](#MinimatchOptions) | [minimatch options](https://github.com/isaacs/minimatch#options) for filtering
followSymlinks | ☑ | boolean | if true and there is a symlink, it can be tried to follow the link and determine its children if it is a node
include | ☑ | object | included in the return object
*include*.withExtension | ☑ | boolean | if *true*, include the [extension](https://nodejs.org/api/path.html#path_path_extname_path) in return object (only for [Leaf](#Leaf)s)
*include*.withPath | ☑ | boolean | if *true*, include the absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths) in return object
*include*.withStats | ☑ | boolean | if *true*, include [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) in return object
*include*.withType | ☑ | boolean | if *true*, include [type](#Types) in return object
rootName | ☑ | string | give the root a name
<!-- Optionsstop -->
<!-- MinimatchOptions -->
## MinimatchOptions



name | optional | type | description 
--- | --- | --- | ---
nobrace | ☑ | boolean (`undefined`) | ─
nocomment | ☑ | boolean (`undefined`) | ─
nonegate | ☑ | boolean (`undefined`) | ─
debug | ☑ | boolean (`undefined`) | ─
noglobstar | ☑ | boolean (`undefined`) | ─
noext | ☑ | boolean (`undefined`) | ─
nonull | ☑ | boolean (`undefined`) | ─
windowsPathsNoEscape | ☑ | boolean (`undefined`) | ─
allowWindowsEscape | ☑ | boolean (`undefined`) | ─
partial | ☑ | boolean (`undefined`) | ─
dot | ☑ | boolean (`undefined`) | ─
nocase | ☑ | boolean (`undefined`) | ─
nocaseMagicOnly | ☑ | boolean (`undefined`) | ─
magicalBraces | ☑ | boolean (`undefined`) | ─
matchBase | ☑ | boolean (`undefined`) | ─
flipNegate | ☑ | boolean (`undefined`) | ─
preserveMultipleSlashes | ☑ | boolean (`undefined`) | ─
optimizationLevel | ☑ | number (`undefined`) | ─
platform | ☑ | [Platform](#Platform) | ─
windowsNoMagicRoot | ☑ | boolean (`undefined`) | ─
<!-- MinimatchOptionsstop -->

# Structures

For the return (when using *json* or *yaml* as the output format) there are certain properties available by default. Optional it is possible to include certain extra properties.

<!-- Hierarchy -->
## Hierarchy
The hierarchy map that will be returned. It can either be a [Leaf](#Leaf) or a [Node](#Node)
[Leaf](#Leaf), [Node](#Node)


<!-- Hierarchystop -->

<!-- Node -->
## Node
**Node**-structure of the hierarchy map


name | optional | type | description 
--- | --- | --- | ---
children | ☐ | array (`undefined`) | children of the node
type | ☑ | [Type](#Type) | optionally included [kind](#Kind) in the filesystem
name | ☐ | string (`undefined`) | the name of the entry (without the base path)
path | ☑ | string (`undefined`) | optionally included absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths)
stats | ☑ | [Stats](#Stats) | optionally included [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
<!-- Nodestop -->

<!-- Leaf -->
## Leaf
**Leaf**-structure of the hierarchy map


name | optional | type | description 
--- | --- | --- | ---
extension | ☑ | string (`undefined`) | optionally included [extension](https://nodejs.org/api/path.html#path_path_extname_path) (only for [Leaf](#Leaf)s)
name | ☐ | string (`undefined`) | the name of the entry (without the base path)
path | ☑ | string (`undefined`) | optionally included absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths)
stats | ☑ | [Stats](#Stats) | optionally included [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
type | ☑ | [Type](#Type) | optionally included [kind](#Kind) in the filesystem
<!-- Leafstop -->

<!-- Types -->
## Types
Types of a [Leaf](#Leaf) or [Node](#Node) entry

* `block-device`
* `char-device`
* `dir`
* `file`
* `pipe`
* `socket`
* `symlink`

<!-- Typesstop -->
<!-- Stats -->
## Stats
A `fs.Stats` object provides information about a file.

Objects returned from {@link stat}, {@link lstat} and {@link fstat} and
their synchronous counterparts are of this type.
If `bigint` in the `options` passed to those methods is true, the numeric values
will be `bigint` instead of `number`, and the object will contain additional
nanosecond-precision properties suffixed with `Ns`.

```console
Stats {
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atimeMs: 1318289051000.1,
  mtimeMs: 1318289051000.1,
  ctimeMs: 1318289051000.1,
  birthtimeMs: 1318289051000.1,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
```

`bigint` version:

```console
BigIntStats {
  dev: 2114n,
  ino: 48064969n,
  mode: 33188n,
  nlink: 1n,
  uid: 85n,
  gid: 100n,
  rdev: 0n,
  size: 527n,
  blksize: 4096n,
  blocks: 8n,
  atimeMs: 1318289051000n,
  mtimeMs: 1318289051000n,
  ctimeMs: 1318289051000n,
  birthtimeMs: 1318289051000n,
  atimeNs: 1318289051000000000n,
  mtimeNs: 1318289051000000000n,
  ctimeNs: 1318289051000000000n,
  birthtimeNs: 1318289051000000000n,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
```


name | optional | type | description 
--- | --- | --- | ---
dev | ☐ | number (`undefined`) | ─
ino | ☐ | number (`undefined`) | ─
mode | ☐ | number (`undefined`) | ─
nlink | ☐ | number (`undefined`) | ─
uid | ☐ | number (`undefined`) | ─
gid | ☐ | number (`undefined`) | ─
rdev | ☐ | number (`undefined`) | ─
size | ☐ | number (`undefined`) | ─
blksize | ☐ | number (`undefined`) | ─
blocks | ☐ | number (`undefined`) | ─
atimeMs | ☐ | number (`undefined`) | ─
mtimeMs | ☐ | number (`undefined`) | ─
ctimeMs | ☐ | number (`undefined`) | ─
birthtimeMs | ☐ | number (`undefined`) | ─
atime | ☐ | string (`undefined`) | ─
mtime | ☐ | string (`undefined`) | ─
ctime | ☐ | string (`undefined`) | ─
birthtime | ☐ | string (`undefined`) | ─
<!-- Statsstop -->
