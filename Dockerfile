FROM node:14.17.6-alpine

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install
COPY . .
RUN yarn build

CMD [ "yarn", "run build", "start build" ]
