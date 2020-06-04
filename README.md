fs-hierarchy
============

create a hierarchy map of files and folders

[![Version](https://img.shields.io/npm/v/fs-hierarchy.svg)](https://npmjs.org/package/fs-hierarchy)
[![Downloads/week](https://img.shields.io/npm/dw/fs-hierarchy.svg)](https://npmjs.org/package/fs-hierarchy)
[![License](https://img.shields.io/npm/l/fs-hierarchy.svg)](https://github.com/fooloomanzoo/fs-hierarchy/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
* [Examples](#examples)
<!-- tocstop -->
  
# Usage
<!-- usage -->
```sh-session
$ npm install -g fs-hierarchy
$ fs-hierarchy COMMAND
running command...
$ fs-hierarchy (-v|--version|version)
fs-hierarchy/0.0.6 linux-x64 node-v12.18.0
$ fs-hierarchy --help [COMMAND]
USAGE
  $ fs-hierarchy COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fs-hierarchy [PATH] [OUTPUT]`](#fs-hierarchy-path-output)

## `fs-hierarchy [PATH] [OUTPUT]`

create a hierarchy map of files and folders

```
USAGE
  $ fs-hierarchy [PATH] [OUTPUT]

ARGUMENTS
  PATH    [default: .] path to create a hierarchy from
  OUTPUT  output filename

OPTIONS
  -c, --contain=ext|path|stats|type  included informations in return object
  -f, --use-filter                   enable filters
  -h, --help                         show this help
  -n, --root-name=root-name          used name for the root-folder
  -o, --format=json|tree|yaml        [default: json] output format
  -s, --follow-symlinks              follow symbolic links
  -v, --version                      show version
  --filter=filter                    filter for all absolute path names (glob)
  --inverse                          inverse filter
  --leaf=leaf                        specify filter for leaf names (glob)
  --no-empty-nodes                   filter child nodes that have no children
  --node=node                        specify filter for node names (glob)
```

_See code: [src/commands/index.ts](https://github.com/fooloomanzoo/fs-hierarchy/blob/0.0.6/src/commands/index.ts)_
<!-- commandsstop -->

# Examples
<!-- examples -->
## JSON
 
```shell-script
$ fs-hierarchie ./src
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
          "name": "types.ts"
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
    }
  ]
}

```


## YAML
 
```shell-script
$ fs-hierarchie ./src -o yaml
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
      - name: "types.ts"
      - name: "write"
        children: 
          - name: "file.ts"
          - name: "index.ts"
          - name: "stdout.ts"

```


## Tree
 
```shell-script
$ fs-hierarchie ./src -o tree
```


```
./src
 ├─ commands
 │  ╰─ index.ts
 ├─ index.ts
 ╰─ lib
    ├─ format
    │  ├─ index.ts
    │  ├─ json-p.ts
    │  ├─ tree.ts
    │  ╰─ yaml.ts
    ├─ hierarchy
    │  ├─ factories.ts
    │  ├─ index.ts
    │  ╰─ read-dir.ts
    ├─ typeguards.ts
    ├─ types.ts
    ╰─ write
       ├─ file.ts
       ├─ index.ts
       ╰─ stdout.ts


```


<!-- examplesstop -->
