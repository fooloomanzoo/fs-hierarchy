# Dockerfile for `fs-hierachy`

## Usage

### Show help 
```sh-session
$ sudo docker run fs-hierarchy --help
```

### From current dir, Output to `stdout` 
```sh-session
$ sudo docker run fs-hierarchy -v $PWD:/in
```

### From `/home`, Input `~/Downloads`, Output to file `~/Documents/out.json`
```sh-session
$ sudo docker run fs-hierarchy -v /home:/in ~/Documents:/out /in/Downloads out.json
```