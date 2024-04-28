# Formats

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
    tree|yaml|json] [-h] [-i ext|path|stats|type] [-m <value>] [--minify] [-r
    <value>] [-s] [-v]

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


```


## Tree (flattened)
 
```shell-script
$ fs-hierarchy ./src/lib/hierarchy -f tree --flat
```


```
/Users/fooloo/projects/fs-hierarchy/src/lib/hierarchy
 ╰╌ /Users/fooloo/projects/fs-hierarchy/src/lib/hierarchy


```


## YAML
 
```shell-script
$ fs-hierarchy ./src -f yaml
```


```yaml
name: "./src"
children: []

```


## YAML (flattened)
 
```shell-script
$ fs-hierarchy ./src/lib/hierarchy -f yaml --flat
```


```yaml
name: "./src"
path: "/Users/fooloo/projects/fs-hierarchy/src/lib/hierarchy"
children: 
  - name: "./src"
    path: "/Users/fooloo/projects/fs-hierarchy/src/lib/hierarchy"
    children: []

```


## JSON
 
```shell-script
$ fs-hierarchy ./src/lib/hierarchy
```


```json
{
  "name": "./src",
  "children": []
}

```


## JSON (flattened)
 
```shell-script
$ fs-hierarchy ./src/lib/hierarchy --flat
```


```json
{
  "name": "./src",
  "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/hierarchy",
  "children": [
    {
      "name": "./src",
      "path": "/Users/fooloo/projects/fs-hierarchy/src/lib/hierarchy",
      "children": []
    }
  ]
}

```


## JSON (minified)
 
```shell-script
$ fs-hierarchy ./src --min
```


```json
{"name":"./src","children":[]}

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
    "dev": 16777230,
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
  "children": []
}

```


## Custom root name
 
```shell-script
$ fs-hierarchy ./src/lib/hierarchy -r "TOPLEVEL"
```


```
TOPLEVEL


```


<!-- formatstop -->

