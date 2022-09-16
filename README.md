# another-story-nest

1. Build data
sudo npx prisma migrate dev

Add some linter : https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js

2. Launch docker
docker-compose --env-file .dev.env -f docker-compose.dev.yml up --build
docker-compose --env-file .prod.env -f docker-compose.prod.yml up --build

3. Launch docker nginx 
sudo docker-compose --env-file ./src/.envs/.prod.env -f docker-compose.prod.yml up --build