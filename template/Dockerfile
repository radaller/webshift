# Dockerfile

# base image
FROM node:alpine

ENV SRC_FOLDER /usr/src

# create & set working directory
RUN mkdir -p $SRC_FOLDER
WORKDIR $SRC_FOLDER

# install dependencies

CMD (cd build && node server.js)

EXPOSE 3000
