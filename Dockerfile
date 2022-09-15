FROM node:14.18.0

RUN mkdir /app
WORKDIR /app

COPY . .

ENV NODE_ENV=${NODE_ENV}

RUN yarn
CMD `yarn build:${NODE_ENV}`

EXPOSE ${PORT}

ENV DATABASE_URL=${DATABASE_URL}

RUN chmod +x bin/start-up.sh
#CMD node dist/main
CMD bin/start-up.sh