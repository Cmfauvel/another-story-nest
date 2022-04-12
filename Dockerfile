FROM node:14-alpine AS builder
# node:16

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY yarn*.lock ./

# Install app dependencies
RUN yarn install --force

COPY . .

RUN yarn build

FROM node:14-alpine

#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/package*.json ./
#COPY --from=builder /app/dist ./dist

EXPOSE 1001
CMD [ "yarn", "start:prod" ]