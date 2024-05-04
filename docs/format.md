# Formatting

`fs-hierarchy` supports different output formats in CLI. Here are the available options:
- [json](#JSON) (default)
- [yaml](#YAML) 
- [tree](#Tree)

<!-- help -->
## CLI
 
```shell-script
$ fs-hierarchy --help
```


```
Create a hierarchy map of a filesystem using node's built-in *fs*.

USAGE
  $ fs-hierarchy  [DIR] [OUTPUT] [-e] [--flat] [-f
    tree|yaml|json] [-h] [-i ext|path|stats|type] [-m <value>] [-M
    all|none|some] [--minify] [-r <value>] [-s] [-v]

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

    if true the full path will be included by default. using tree format the
    full path will be used instead of the filenames

  --minify  minify the output

    only for json format


```


<!-- helpstop -->

<!-- format -->
## Tree
 
```shell-script
$ fs-hierarchy ./src -f tree
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


## Tree (flattened)
 
```shell-script
$ fs-hierarchy ./src/lib/utils -f tree --flat
```


```
/Users/fooloo/projects/fs-hierarchy/src/lib/utils
 ├─ /Users/fooloo/projects/fs-hierarchy/src/lib/utils/factories.ts
 ├─ /Users/fooloo/projects/fs-hierarchy/src/lib/utils/flatten.ts
 ├─ /Users/fooloo/projects/fs-hierarchy/src/lib/utils/leaf.ts
 ├─ /Users/fooloo/projects/fs-hierarchy/src/lib/utils/read-dir.ts
 ├─ /Users/fooloo/projects/fs-hierarchy/src/lib/utils/type.ts
 ╰─ /Users/fooloo/projects/fs-hierarchy/src/lib/utils/typeguards.ts


```


## YAML
 
```shell-script
$ fs-hierarchy ./src -f yaml
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
          - name: "json.ts"
          - name: "tree.ts"
          - name: "yaml.ts"
      - name: "hierarchy.ts"
      - name: "index.ts"
      - name: "types.ts"
      - name: "utils"
        children: 
          - name: "factories.ts"
          - name: "flatten.ts"
          - name: "leaf.ts"
          - name: "read-dir.ts"
          - name: "type.ts"
          - name: "typeguards.ts"
      - name: "write"
        children: 
          - name: "file.ts"
          - name: "stdout.ts"

```


## YAML (flattened)
 
```shell-script
$ fs-hierarchy ./src/lib/utils -f yaml --flat
```


```yaml
name: "./src"
path: "/Users/fooloo/projects/fs-hierarchy/src/lib/utils"
children: 
  - name: "factories.ts"
    path: "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/factories.ts"
  - name: "flatten.ts"
    path: "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/flatten.ts"
  - name: "leaf.ts"
    path: "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/leaf.ts"
  - name: "read-dir.ts"
    path: "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/read-dir.ts"
  - name: "type.ts"
    path: "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/type.ts"
  - name: "typeguards.ts"
    path: "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/typeguards.ts"

```


## JSON
 
```shell-script
$ fs-hierarchy ./src/lib/utils
```


```json
{
  "name": "./src",
  "children": [
    {
      "name": "factories.ts"
    },
    {
      "name": "flatten.ts"
    },
    {
      "name": "leaf.ts"
    },
    {
      "name": "read-dir.ts"
    },
    {
      "name": "type.ts"
    },
    {
      "name": "typeguards.ts"
    }
  ]
}

```


## JSON (flattened)
 
```shell-script
$ fs-hierarchy ./src/lib/utils --flat
```


```json
{
  "name": "./src",
  "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/utils",
  "children": [
    {
      "name": "factories.ts",
      "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/factories.ts"
    },
    {
      "name": "flatten.ts",
      "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/flatten.ts"
    },
    {
      "name": "leaf.ts",
      "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/leaf.ts"
    },
    {
      "name": "read-dir.ts",
      "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/read-dir.ts"
    },
    {
      "name": "type.ts",
      "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/type.ts"
    },
    {
      "name": "typeguards.ts",
      "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/utils/typeguards.ts"
    }
  ]
}

```


## JSON (minified)
 
```shell-script
$ fs-hierarchy ./src --min
```


```json
{"name":"./src","children":[{"name":"commands","children":[{"name":"index.ts"}]},{"name":"index.ts"},{"name":"lib","children":[{"name":"format","children":[{"name":"json.ts"},{"name":"tree.ts"},{"name":"yaml.ts"}]},{"name":"hierarchy.ts"},{"name":"index.ts"},{"name":"types.ts"},{"name":"utils","children":[{"name":"factories.ts"},{"name":"flatten.ts"},{"name":"leaf.ts"},{"name":"read-dir.ts"},{"name":"type.ts"},{"name":"typeguards.ts"}]},{"name":"write","children":[{"name":"file.ts"},{"name":"stdout.ts"}]}]}]}

```


## Include extension, path, type & stats
 
```shell-script
$ fs-hierarchy ./src/lib/format -i ext path type stats
```


```json
{
  "name": "./src",
  "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/format",
  "type": "dir",
  "stats": {
    "dev": 16777233,
    "mode": 16877,
    "nlink": 5,
    "uid": 501,
    "gid": 20,
    "rdev": 0,
    "blksize": 4096,
    "ino": 147663762,
    "size": 160,
    "blocks": 0,
    "atimeMs": 1714251044891.566,
    "mtimeMs": 1714251043864.373,
    "ctimeMs": 1714251043864.373,
    "birthtimeMs": 1707641380732.3286,
    "atime": "2024-04-27T20:50:44.892Z",
    "mtime": "2024-04-27T20:50:43.864Z",
    "ctime": "2024-04-27T20:50:43.864Z",
    "birthtime": "2024-02-11T08:49:40.732Z"
  },
  "children": [
    {
      "name": "json.ts",
      "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/format/json.ts",
      "extension": ".ts",
      "type": "file",
      "stats": {
        "dev": 16777233,
        "mode": 33188,
        "nlink": 1,
        "uid": 501,
        "gid": 20,
        "rdev": 0,
        "blksize": 4096,
        "ino": 147663764,
        "size": 317,
        "blocks": 8,
        "atimeMs": 1707655875409.0078,
        "mtimeMs": 1707655874873.5872,
        "ctimeMs": 1707655874873.5872,
        "birthtimeMs": 1707641380732.4365,
        "atime": "2024-02-11T12:51:15.409Z",
        "mtime": "2024-02-11T12:51:14.874Z",
        "ctime": "2024-02-11T12:51:14.874Z",
        "birthtime": "2024-02-11T08:49:40.732Z"
      }
    },
    {
      "name": "tree.ts",
      "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/format/tree.ts",
      "extension": ".ts",
      "type": "file",
      "stats": {
        "dev": 16777233,
        "mode": 33188,
        "nlink": 1,
        "uid": 501,
        "gid": 20,
        "rdev": 0,
        "blksize": 4096,
        "ino": 147663765,
        "size": 963,
        "blocks": 8,
        "atimeMs": 1714466019384.7158,
        "mtimeMs": 1714385206723.3062,
        "ctimeMs": 1714385206723.3062,
        "birthtimeMs": 1707641380732.5056,
        "atime": "2024-04-30T08:33:39.385Z",
        "mtime": "2024-04-29T10:06:46.723Z",
        "ctime": "2024-04-29T10:06:46.723Z",
        "birthtime": "2024-02-11T08:49:40.733Z"
      }
    },
    {
      "name": "yaml.ts",
      "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/format/yaml.ts",
      "extension": ".ts",
      "type": "file",
      "stats": {
        "dev": 16777233,
        "mode": 33188,
        "nlink": 1,
        "uid": 501,
        "gid": 20,
        "rdev": 0,
        "blksize": 4096,
        "ino": 147801843,
        "size": 1528,
        "blocks": 8,
        "atimeMs": 1714312487241.136,
        "mtimeMs": 1714312486849.7004,
        "ctimeMs": 1714312486849.7004,
        "birthtimeMs": 1707655918237.2788,
        "atime": "2024-04-28T13:54:47.241Z",
        "mtime": "2024-04-28T13:54:46.850Z",
        "ctime": "2024-04-28T13:54:46.850Z",
        "birthtime": "2024-02-11T12:51:58.237Z"
      }
    }
  ]
}

```


## Custom root name
 
```shell-script
$ fs-hierarchy ./src/lib/utils -r "TOPLEVEL"
```


```
TOPLEVEL
 ├─ factories.ts
 ├─ flatten.ts
 ├─ leaf.ts
 ├─ read-dir.ts
 ├─ type.ts
 ╰─ typeguards.ts


```


<!-- formatstop -->

