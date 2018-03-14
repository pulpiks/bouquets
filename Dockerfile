FROM node:9-alpine


RUN mkdir -p /srv/bloomon
WORKDIR /srv/bloomon

ADD package*.json /srv/bloomon/

RUN npm i

ADD . /srv/bloomon/

ENV LC_ALL="C.utf-8" LANGUAGE="C.utf-8" LANG="C.utf-8" PORT=9081 DEBUG="*"

EXPOSE 9081
CMD [ "npm", "start" ]
