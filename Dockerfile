FROM node:18.13.0

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 1001

ENV DATABASE_URL="postgres://root:a6UmXVeGLK0hMnIBtmw4c1kjjRBQYavD@dpg-cl1707f5b13s73cmsla0-a/another_story"

RUN chmod +x bin/start-up.sh
#CMD node dist/main
CMD bin/start-up.sh