# Dockerfile for `fs-hierachy`
[![Docker Pulls](https://img.shields.io/docker/pulls/fooloomanzoo/fs-hierarchy?style=for-the-badge)](https://hub.docker.com/repository/docker/fooloomanzoo/fs-hierarchy)
[![Images Size](https://img.shields.io/docker/image-size/fooloomanzoo/fs-hierarchy?sort=date&style=for-the-badge)](https://hub.docker.com/repository/docker/fooloomanzoo/fs-hierarchy)

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