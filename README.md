fs-hierarchy
============

Create a hierarchy map of a filesystem using node's built-in **fs**. 

You can use the CLI or include it directly in your project.
It returns a structure that can be used in different contexts like for [d3-hierarchy](https://observablehq.com/@d3/d3-hierarchy). 

Additionally it is possible:
* to include extra informations like the file extension, the absolute path, the type and [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
* filter paths and names
* follow symbolic links
* output in json, yaml or in a tree (CLI only)

[![Version](https://img.shields.io/npm/v/fs-hierarchy.svg)](https://npmjs.org/package/fs-hierarchy)
[![Downloads/week](https://img.shields.io/npm/dw/fs-hierarchy.svg)](https://npmjs.org/package/fs-hierarchy)
[![License](https://img.shields.io/npm/l/fs-hierarchy.svg)](https://github.com/fooloomanzoo/fs-hierarchy/blob/master/package.json)

<!-- toc -->
* [Command line](#command-line)
* [Programmatic use](#programmatic-use)
* [Structures](#structures)
* [Output](#output)
* [Filtering](#filtering)
<!-- tocstop -->
  
# Command line
<!-- usage -->
```sh-session
$ npm install -g fs-hierarchy
$ fs-hierarchy COMMAND
running command...
$ fs-hierarchy (-v|--version|version)
fs-hierarchy/1.1.2 linux-x64 node-v12.18.0
$ fs-hierarchy --help [COMMAND]
USAGE
  $ fs-hierarchy COMMAND
...
```
<!-- usagestop -->

## Commands
<!-- commands -->
* [`fs-hierarchy [PATH] [OUTPUT]`](#fs-hierarchy-path-output)
* [`fs-hierarchy help [COMMAND]`](#fs-hierarchy-help-command)

## `fs-hierarchy [PATH] [OUTPUT]`

Create a hierarchy map of a filesystem using node's built-in *fs*.

```
USAGE
  $ fs-hierarchy [PATH] [OUTPUT]

ARGUMENTS
  PATH    [default: .] path to create a hierarchy from
  OUTPUT  output filename

OPTIONS
  -f, --filter=filter                enable filtering for paths (glob), negate by leading '!', depends on '--filter'
  -h, --help                         show this help
  -i, --include=ext|path|stats|type  the included informations in return object
  -n, --no-empty                     to filter child nodes that have no children

  -o, --format=json|tree|yaml        [default: json] used output format (overwritten if the the output path has a json-
                                     or yml/yaml-extension)

  -r, --root-name=root-name          the used name for the root-folder

  -s, --follow-symlinks              follow symbolic links

  -v, --version                      show the version
```

_See code: [src/commands/index.ts](https://github.com/fooloomanzoo/fs-hierarchy/blob/1.1.2/src/commands/index.ts)_

## `fs-hierarchy help [COMMAND]`

display help for fs-hierarchy

```
USAGE
  $ fs-hierarchy help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_
<!-- commandsstop -->

# Programmatic use

```sh-session
$ npm install fs-hierarchy
```

```javascript
const { generateHierarchy } = require('fs-hirarchy');

const root = '...';
const options = {...};
const myfiles = generateHierarchy(root, options);
```

<!-- Options -->
## Options
Use the options if want to filter the resulting [hierarchy](#Hierarchy) object or want to include extra informations.


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
[minimatch options](https://github.com/isaacs/minimatch#options) for filtering


name | optional | type | description 
--- | --- | --- | ---
debug | ☑ | boolean (`false`) | Dump a ton of stuff to stderr.
dot | ☑ | boolean (`true`) | Allow patterns to match filenames starting with a period, even if the pattern does not explicitly have a period in that spot.
flipNegate | ☑ | boolean (`false`) | Returns from negate expressions the same as if they were not negated. (Ie, true on a hit, false on a miss.)
matchBase | ☑ | boolean (`true`) | If set, then patterns without slashes will be matched against the basename of the path if it contains slashes.
nobrace | ☑ | boolean (`false`) | Do not expand {a,b} and {1..3} brace sets.
nocase | ☑ | boolean (`false`) | Perform a case-insensitive match.
nocomment | ☑ | boolean (`false`) | Suppress the behavior of treating # at the start of a pattern as a comment.
noext | ☑ | boolean (`false`) | Disable "extglob" style patterns like +(a|b).
noglobstar | ☑ | boolean (`false`) | Disable ** matching against multiple folder names.
nonegate | ☑ | boolean (`false`) | Suppress the behavior of treating a leading ! character as negation.
nonull | ☑ | boolean (`false`) | When a match is not found by minimatch.match, return a list containing the pattern itself if this option is set. Otherwise, an empty list is returned if there are no matches.
<!-- MinimatchOptionsstop -->
# Structures

As a return (when using *json* or *yaml* as the output format) there are certain properties available by default. Optional it is possible to include some extra properties.

<!-- Hierarchy -->
## Hierarchy

[Leaf](#Leaf), [Node](#Node)


<!-- Hierarchystop -->

<!-- Node -->
## Node
**Node**-structure of the hierarchy map


name | optional | type | description 
--- | --- | --- | ---
children | ☐ | array (``[]``) | children of the node
name | ☐ | string | the name of the entry (without the base path)
path | ☑ | string | optionally included absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths)
stats | ☑ | [Stats](#Stats) | optionally included [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
type | ☑ | [Types](#Types) | optionally included [type](#Types) in the filesystem
<!-- Nodestop -->

<!-- Leaf -->
## Leaf
**Leaf**-structure of the hierarchy map


name | optional | type | description 
--- | --- | --- | ---
extension | ☑ | string | optionally included [extension](https://nodejs.org/api/path.html#path_path_extname_path) (only for [Leaf](#Leaf)s)
name | ☐ | string | the name of the entry (without the base path)
path | ☑ | string | optionally included absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths)
stats | ☑ | [Stats](#Stats) | optionally included [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
type | ☑ | [Types](#Types) | optionally included [type](#Types) in the filesystem
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



name | optional | type | description 
--- | --- | --- | ---
atime | ☐ | string | Enables basic storage and retrieval of dates and times.
atimeMs | ☐ | number | ─
birthtime | ☐ | string | Enables basic storage and retrieval of dates and times.
birthtimeMs | ☐ | number | ─
blksize | ☐ | number | ─
blocks | ☐ | number | ─
ctime | ☐ | string | Enables basic storage and retrieval of dates and times.
ctimeMs | ☐ | number | ─
dev | ☐ | number | ─
gid | ☐ | number | ─
ino | ☐ | number | ─
mode | ☐ | number | ─
mtime | ☐ | string | Enables basic storage and retrieval of dates and times.
mtimeMs | ☐ | number | ─
nlink | ☐ | number | ─
rdev | ☐ | number | ─
size | ☐ | number | ─
uid | ☐ | number | ─
<!-- Statsstop -->


# Output
<!-- output -->
## JSON
 
```shell-script
$ fs-hierarchy ./src
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
          "name": "format",
          "children": [
            {
              "name": "index.ts"
            },
            {
              "name": "json.ts"
            },
            {
              "name": "tree.ts"
            },
            {
              "name": "yaml.ts"
            }
          ]
        },
        {
          "name": "hierarchy",
          "children": [
            {
              "name": "factories.ts"
            },
            {
              "name": "index.ts"
            },
            {
              "name": "read-dir.ts"
            }
          ]
        },
        {
          "name": "typeguards.ts"
        },
        {
          "name": "write",
          "children": [
            {
              "name": "file.ts"
            },
            {
              "name": "index.ts"
            },
            {
              "name": "stdout.ts"
            }
          ]
        }
      ]
    },
    {
      "name": "types.ts"
    }
  ]
}

```


## with extension, path, type & stats
 
```shell-script
$ fs-hierarchy ./test -i ext path type stats
```


```json
{
  "name": "./test",
  "path": "/home/buddy/projects/fs-hierarchy/test",
  "type": "dir",
  "stats": {
    "dev": 2051,
    "mode": 16893,
    "nlink": 2,
    "uid": 1000,
    "gid": 1000,
    "rdev": 0,
    "blksize": 4096,
    "ino": 2500760,
    "size": 4096,
    "blocks": 8,
    "atimeMs": 1591515507954.0964,
    "mtimeMs": 1590655938999.0305,
    "ctimeMs": 1590655938999.0305,
    "birthtimeMs": 1590655929458.9397,
    "atime": "2020-06-07T07:38:27.954Z",
    "mtime": "2020-05-28T08:52:18.999Z",
    "ctime": "2020-05-28T08:52:18.999Z",
    "birthtime": "2020-05-28T08:52:09.459Z"
  },
  "children": [
    {
      "name": "index.test.ts",
      "path": "/home/buddy/projects/fs-hierarchy/test/index.test.ts",
      "extension": ".ts",
      "type": "file",
      "stats": {
        "dev": 2051,
        "mode": 33204,
        "nlink": 1,
        "uid": 1000,
        "gid": 1000,
        "rdev": 0,
        "blksize": 4096,
        "ino": 2500771,
        "size": 426,
        "blocks": 8,
        "atimeMs": 1591517214816.851,
        "mtimeMs": 1590706118297.9292,
        "ctimeMs": 1590706118297.9292,
        "birthtimeMs": 1590655938999.0305,
        "atime": "2020-06-07T08:06:54.817Z",
        "mtime": "2020-05-28T22:48:38.298Z",
        "ctime": "2020-05-28T22:48:38.298Z",
        "birthtime": "2020-05-28T08:52:18.999Z"
      }
    },
    {
      "name": "mocha.opts",
      "path": "/home/buddy/projects/fs-hierarchy/test/mocha.opts",
      "extension": ".opts",
      "type": "file",
      "stats": {
        "dev": 2051,
        "mode": 33204,
        "nlink": 1,
        "uid": 1000,
        "gid": 1000,
        "rdev": 0,
        "blksize": 4096,
        "ino": 2500764,
        "size": 92,
        "blocks": 8,
        "atimeMs": 1591517214816.851,
        "mtimeMs": 1590655929458.9397,
        "ctimeMs": 1590655929458.9397,
        "birthtimeMs": 1590655929458.9397,
        "atime": "2020-06-07T08:06:54.817Z",
        "mtime": "2020-05-28T08:52:09.459Z",
        "ctime": "2020-05-28T08:52:09.459Z",
        "birthtime": "2020-05-28T08:52:09.459Z"
      }
    },
    {
      "name": "tsconfig.json",
      "path": "/home/buddy/projects/fs-hierarchy/test/tsconfig.json",
      "extension": ".json",
      "type": "file",
      "stats": {
        "dev": 2051,
        "mode": 33204,
        "nlink": 1,
        "uid": 1000,
        "gid": 1000,
        "rdev": 0,
        "blksize": 4096,
        "ino": 2500761,
        "size": 120,
        "blocks": 8,
        "atimeMs": 1591517214816.851,
        "mtimeMs": 1590655929458.9397,
        "ctimeMs": 1590655929458.9397,
        "birthtimeMs": 1590655929458.9397,
        "atime": "2020-06-07T08:06:54.817Z",
        "mtime": "2020-05-28T08:52:09.459Z",
        "ctime": "2020-05-28T08:52:09.459Z",
        "birthtime": "2020-05-28T08:52:09.459Z"
      }
    }
  ]
}

```


## YAML
 
```shell-script
$ fs-hierarchy ./src -o yaml
```


```yaml
name: "./src"
children: 
  - name: "commands"
    children: 
      - name: "index.ts"
  - name: "index.ts"
  - name: "lib"
    children: 
      - name: "format"
        children: 
          - name: "index.ts"
          - name: "json.ts"
          - name: "tree.ts"
          - name: "yaml.ts"
      - name: "hierarchy"
        children: 
          - name: "factories.ts"
          - name: "index.ts"
          - name: "read-dir.ts"
      - name: "typeguards.ts"
      - name: "write"
        children: 
          - name: "file.ts"
          - name: "index.ts"
          - name: "stdout.ts"
  - name: "types.ts"

```


## Tree
 
```shell-script
$ fs-hierarchy ./src -o tree
```


```
./src
 ├─ commands
 │  ╰─ index.ts
 ├─ index.ts
 ├─ lib
 │  ├─ format
 │  │  ├─ index.ts
 │  │  ├─ json.ts
 │  │  ├─ tree.ts
 │  │  ╰─ yaml.ts
 │  ├─ hierarchy
 │  │  ├─ factories.ts
 │  │  ├─ index.ts
 │  │  ╰─ read-dir.ts
 │  ├─ typeguards.ts
 │  ╰─ write
 │     ├─ file.ts
 │     ├─ index.ts
 │     ╰─ stdout.ts
 ╰─ types.ts


```


<!-- examplesstop -->

# Filtering
<!-- filter -->
## matching files
 
```shell-script
$ fs-hierarchy ./test --filter '*.json'
```


```
{
  "name": "./src",
  "children": [
    {
      "name": "tsconfig.json"
    }
  ]
}

```


## glob matching including empty nodes
 
```shell-script
$ fs-hierarchy ./src -o tree -f '**/format/*'
```


```
./src
 ├╌ commands
 ╰─ lib
    ├─ format
    │  ├─ index.ts
    │  ├─ json.ts
    │  ├─ tree.ts
    │  ╰─ yaml.ts
    ├╌ hierarchy
    ╰╌ write


```


## filter empty nodes
 
```shell-script
$ fs-hierarchy ./src -o tree -f '**/format/*' --no-empty
```


```
./src
 ╰─ lib
    ╰─ format
       ├─ index.ts
       ├─ json.ts
       ├─ tree.ts
       ╰─ yaml.ts


```


## pattern list
 
```shell-script
$ fs-hierarchy ./src -o tree -f '*@(e|x).ts'
```


```
./src
 ├─ commands
 │  ╰─ index.ts
 ├─ index.ts
 ╰─ lib
    ├─ format
    │  ├─ index.ts
    │  ╰─ tree.ts
    ├─ hierarchy
    │  ╰─ index.ts
    ╰─ write
       ├─ file.ts
       ╰─ index.ts


```


## brace expansion
 
```shell-script
$ fs-hierarchy ./ -o tree -f '**/{utils,docker}/**/*.d.ts' -n
```


```
./fs-hierarchy
 ╰─ node_modules
    ├─ @nodelib
    │  ╰─ fs.scandir
    │     ╰─ out
    │        ╰─ utils
    │           ├─ fs.d.ts
    │           ╰─ index.d.ts
    ╰─ fast-glob
       ╰─ out
          ╰─ utils
             ├─ array.d.ts
             ├─ errno.d.ts
             ├─ fs.d.ts
             ├─ index.d.ts
             ├─ path.d.ts
             ├─ pattern.d.ts
             ├─ stream.d.ts
             ╰─ string.d.ts


```


## negation
 
```shell-script
$ fs-hierarchy ./ -o tree -nf '!**/{lib,.git,node_modules}/**'
```


```
./fs-hierarchy
 ├─ .editorconfig
 ├─ .eslintignore
 ├─ .eslintrc
 ├─ .gitattributes
 ├─ .gitignore
 ├─ .prettierrc
 ├─ .vscode
 │  ╰─ settings.json
 ├─ LICENSE
 ├─ README.md
 ├─ bin
 │  ├─ run
 │  ╰─ run.cmd
 ├─ docker
 │  ├─ Dockerfile
 │  ╰─ README.md
 ├─ oclif.manifest.json
 ├─ package-lock.json
 ├─ package.json
 ├─ src
 │  ├─ commands
 │  │  ╰─ index.ts
 │  ├─ index.ts
 │  ╰─ types.ts
 ├─ test
 │  ├─ index.test.ts
 │  ├─ mocha.opts
 │  ╰─ tsconfig.json
 ├─ tsconfig.json
 ╰─ utils
    ╰─ readme.js


```


<!-- filterstop -->
