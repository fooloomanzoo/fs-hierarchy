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
          "name": "index.ts"
        },
        {
          "name": "utils",
          "children": []
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
    ├─ index.ts
    ├─ utils
    │  ╰─ type.ts
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
    ╰─ hierarchy.ts


```


## filter by multiple patterns and matching all
 
```shell-script
$ fs-hierarchy ./src -m 't*.ts' '*s.ts' -M all
```


```
./src
 ╰─ lib
    ├─ types.ts
    ╰─ utils
       ╰─ typeguards.ts


```


## filter by multiple patterns and matching some (default)
 
```shell-script
$ fs-hierarchy ./src -m '*n.ts' '*s.ts' -M some
```


```
./src
 ╰─ lib
    ├─ format
    │  ╰─ json.ts
    ├─ types.ts
    ╰─ utils
       ├─ factories.ts
       ├─ flatten.ts
       ╰─ typeguards.ts


```


## filter by multiple patterns and matching none
 
```shell-script
$ fs-hierarchy ./src -m '*n.ts' '*s.ts' -M none
```


```
./src
 ├─ commands
 │  ╰─ index.ts
 ├─ index.ts
 ╰─ lib
    ├─ format
    │  ├─ tree.ts
    │  ╰─ yaml.ts
    ├─ hierarchy.ts
    ├─ index.ts
    ├─ utils
    │  ├─ leaf.ts
    │  ├─ read-dir.ts
    │  ╰─ type.ts
    ╰─ write
       ├─ file.ts
       ╰─ stdout.ts


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
 ├─ .nvmrc
 ├─ .prettierrc
 ├─ Dockerfile
 ├─ LICENSE
 ├─ README.md
 ├─ bin
 │  ├─ dev.cmd
 │  ├─ dev.js
 │  ├─ run.cmd
 │  ╰─ run.js
 ├─ docs
 │  ├─ filter.md
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
 │     ├─ hierarchy.ts
 │     ├─ index.ts
 │     ├─ types.ts
 │     ├─ utils
 │     │  ├─ factories.ts
 │     │  ├─ flatten.ts
 │     │  ├─ leaf.ts
 │     │  ├─ read-dir.ts
 │     │  ├─ type.ts
 │     │  ╰─ typeguards.ts
 │     ╰─ write
 │        ├─ file.ts
 │        ╰─ stdout.ts
 ├─ tsconfig.json
 ╰─ utils
    ├─ output.ts
    ├─ readme.ts
    ╰─ tags.ts


```


<!-- filterstop -->
