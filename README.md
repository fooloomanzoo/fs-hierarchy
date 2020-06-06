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
* [Examples](#examples)
<!-- tocstop -->
  
# Command line
<!-- usage -->
```sh-session
$ npm install -g fs-hierarchy
$ fs-hierarchy COMMAND
running command...
$ fs-hierarchy (-v|--version|version)
fs-hierarchy/1.0.4 linux-x64 node-v12.18.0
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
  -f, --use-filter                   use to enable filtering
  -h, --help                         show this help
  -i, --include=ext|path|stats|type  the included informations in return object
  -n, --root-name=root-name          the used name for the root-folder

  -o, --format=json|tree|yaml        [default: json] used output format (overwritten if the the output path has a json-
                                     or yml/yaml-extension)

  -s, --follow-symlinks              follow symbolic links

  -v, --version                      show the version

  --filter=filter                    the filter for all absolute path names (glob)

  --inverse                          inverse the filters

  --leaf=leaf                        specify the filter for leaf names (glob)

  --no-empty-nodes                   to filter child nodes that have no children

  --node=node                        specify the filter for node names (glob)
```

_See code: [src/commands/index.ts](https://github.com/fooloomanzoo/fs-hierarchy/blob/1.0.4/src/commands/index.ts)_

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
filter | ☑ | [RegExp](#RegExp), string | filter for the absolute paths of the found [Leaf](#Leaf)s or the [Node](#Node)s
followSymlinks | ☑ | boolean | if true and there is a symlink, it can be tried to follow the link and determine its children if it is a node
include | ☑ | object | included in the return object
*include*.withExtension | ☑ | boolean | if *true*, include the [extension](https://nodejs.org/api/path.html#path_path_extname_path) in return object (only for [Leaf](#Leaf)s)
*include*.withPath | ☑ | boolean | if *true*, include the absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths) in return object
*include*.withStats | ☑ | boolean | if *true*, include [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) in return object
*include*.withType | ☑ | boolean | if *true*, include [type](#Types) in return object
inverse | ☑ | boolean | inverse results for *filter*, *leafFilter* and *nodeFilter*
leafFilter | ☑ | [RegExp](#RegExp), string | filter for the name of the found [Leaf](#Leaf)s
noEmptyChildNodes | ☑ | boolean | if true, [Node](#Node)s with no children won't be returned (except for the root-node)
nodeFilter | ☑ | [RegExp](#RegExp), string | filter for the name of the found [Node](#Node)s
rootName | ☑ | string | give the root a name
<!-- Optionsstop -->

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
children | ☐ | array | children of the node
name | ☐ | string | the name of the entry (without the base path)
path | ☑ | string | optionally included absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths)
stats | ☑ | undefined | optionally included [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
type | ☑ | undefined | optionally included [type](#Types) in the filesystem
<!-- Nodestop -->

<!-- Leaf -->
## Leaf
**Leaf**-structure of the hierarchy map


name | optional | type | description
--- | --- | --- | ---
extension | ☑ | string | optionally included [extension](https://nodejs.org/api/path.html#path_path_extname_path) (only for [Leaf](#Leaf)s)
name | ☐ | string | the name of the entry (without the base path)
path | ☑ | string | optionally included absolute [path](https://nodejs.org/api/path.html#path_path_resolve_paths)
stats | ☑ | undefined | optionally included [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)
type | ☑ | undefined | optionally included [type](#Types) in the filesystem
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


# Examples
<!-- examples -->
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
							"name": "json-p.ts"
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
		"atimeMs": 1591390047369.5208,
		"mtimeMs": 1590655938999.0305,
		"ctimeMs": 1590655938999.0305,
		"birthtimeMs": 1590655929458.9397,
		"atime": "2020-06-05T20:47:27.370Z",
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
				"atimeMs": 1591282346055.544,
				"mtimeMs": 1590706118297.9292,
				"ctimeMs": 1590706118297.9292,
				"birthtimeMs": 1590655938999.0305,
				"atime": "2020-06-04T14:52:26.056Z",
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
				"atimeMs": 1591108845893.1775,
				"mtimeMs": 1590655929458.9397,
				"ctimeMs": 1590655929458.9397,
				"birthtimeMs": 1590655929458.9397,
				"atime": "2020-06-02T14:40:45.893Z",
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
				"atimeMs": 1591108845897.1775,
				"mtimeMs": 1590655929458.9397,
				"ctimeMs": 1590655929458.9397,
				"birthtimeMs": 1590655929458.9397,
				"atime": "2020-06-02T14:40:45.897Z",
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
					- name: "json-p.ts"
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
 │  │  ├─ json-p.ts
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
