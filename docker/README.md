# Dockerfile for `fs-hierachy`

## Usage

* Mount current dir, Output to `stdout` 
```sh-session
$ sudo docker run fs-hierarchy -v $PWD:/in
```

* Mount `/home`, Input `~/Downloads`, Output to file `~/Documents/out.json`
```sh-session
$ sudo docker run fs-hierarchy -v /home:/in ~/Documents:/out /in/Downloads out.json
```