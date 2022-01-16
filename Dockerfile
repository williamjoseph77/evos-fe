FROM node:16-alpine

RUN mkdir /app

COPY . /app

RUN yarn --cwd /app install

CMD ["yarn", "--cwd" ,"/app", "start"]