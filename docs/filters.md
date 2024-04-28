# Filter

The output can be automatically filtered by passing glob options.
This file contains examples about filters in the fs-hierarchy project.
Filters are used to filter the including files.

If using multiple filters, all options have to match so that the result will be included in the output.

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
<!-- filter -->
## match files
 
```shell-script
$ fs-hierarchy ./src --match 'index.ts'
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


## match files (including empty nodes)
 
```shell-script
$ fs-hierarchy ./src -m 'index.ts' -e
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
          "children": []
        },
        {
          "name": "hierarchy",
          "children": [
            {
              "name": "utils",
              "children": []
            }
          ]
        },
        {
          "name": "write",
          "children": []
        }
      ]
    }
  ]
}

```


## glob pattern list
 
```shell-script
$ fs-hierarchy ./src -m '*@(e|x).ts'
```


```
./src
 ├─ commands
 │  ╰─ index.ts
 ├─ index.ts
 ╰─ lib
    ├─ format
    │  ╰─ tree.ts
    ├─ hierarchy
    │  ╰─ utils
    │     ╰─ type.ts
    ╰─ write
       ╰─ file.ts


```


## glob brace expansion
 
```shell-script
$ fs-hierarchy ./src -m '**/{json,hierarchy}.ts'
```


```
./src
 ╰─ lib
    ├─ format
    │  ╰─ json.ts
    ╰─ hierarchy
       ╰─ hierarchy.ts


```


## multiple glob patterns
 
```shell-script
$ fs-hierarchy ./src -m '*n.ts' '*s.ts'
```


```
./src
 ╰─ lib
    ├─ format
    │  ╰─ json.ts
    ├─ hierarchy
    │  ├─ factories.ts
    │  ╰─ utils
    │     ╰─ flatten.ts
    ├─ typeguards.ts
    ╰─ types.ts


```


## glob negation
 
```shell-script
$ fs-hierarchy ./ -m '!**/{dist,.git,node_modules}/**'
```


```
./src
 ├─ .editorconfig
 ├─ .eslintignore
 ├─ .eslintrc
 ├─ .gitattributes
 ├─ .gitignore
 ├─ .npmrc
 ├─ .prettierrc
 ├─ .vscode
 │  ╰─ settings.json
 ├─ Dockerfile
 ├─ LICENSE
 ├─ README.md
 ├─ bin
 │  ├─ dev.cmd
 │  ├─ dev.js
 │  ├─ run.cmd
 │  ╰─ run.js
 ├─ docs
 │  ├─ filters.md
 │  ├─ format.md
 │  ╰─ using-docker.md
 ├─ oclif.manifest.json
 ├─ package-lock.json
 ├─ package.json
 ├─ src
 │  ├─ commands
 │  │  ╰─ index.ts
 │  ├─ index.ts
 │  ╰─ lib
 │     ├─ format
 │     │  ├─ json.ts
 │     │  ├─ tree.ts
 │     │  ╰─ yaml.ts
 │     ├─ hierarchy
 │     │  ├─ factories.ts
 │     │  ├─ hierarchy.ts
 │     │  ├─ read-dir.ts
 │     │  ╰─ utils
 │     │     ├─ flatten.ts
 │     │     ├─ leaf.ts
 │     │     ╰─ type.ts
 │     ├─ typeguards.ts
 │     ├─ types.ts
 │     ╰─ write
 │        ├─ file.ts
 │        ╰─ stdout.ts
 ├─ tsconfig.json
 ╰─ utils
    ├─ output.ts
    ├─ readme.ts
    ├─ schema.ts
    ├─ table.ts
    ╰─ tags.ts


```


<!-- filterstop -->
