# Dockerfile for `fs-hierachy`

## Usage

### Show help 
```sh-session
$ sudo docker run fooloomanzoo/fs-hierarchy --help
```

### From current dir, Output to `stdout` 
```sh-session
$ sudo docker run -v $PWD:/in fooloomanzoo/fs-hierarchy
```

### From `~`, Input `~/Downloads`, Output to file `~/Documents/out.json`
```sh-session
$ sudo docker run -v ~:/in -v ~/Documents:/out fooloomanzoo/fs-hierarchy /in/Downloads out.json
```