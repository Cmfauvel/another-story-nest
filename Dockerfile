FROM node:14.18.0

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 1001

ENV DATABASE_URL="postgresql://root:1234@postgres:5432/another_story"

RUN chmod +x bin/start-up.sh
#CMD node dist/main
CMD bin/start-up.sh