#! /bin/sh

npx prisma generate
npx prisma migrate deploy
node dist/src/main.js