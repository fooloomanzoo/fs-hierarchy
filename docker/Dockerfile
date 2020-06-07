FROM node:10-alpine

ENV NPM_CONFIG_PREFIX=/usr/node/.npm-global

RUN npm i -g fs-hierarchy

VOLUME [ "/in" ]
VOLUME [ "/out" ]

WORKDIR /out

ENTRYPOINT ["/usr/node/.npm-global/bin/fs-hierarchy"]
