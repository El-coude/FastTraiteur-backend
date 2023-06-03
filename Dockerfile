FROM node:18 as dev

WORKDIR /fast

COPY package.json .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3333


CMD [  "npm", "run", "start:dev" ]

FROM node:18 as prod

WORKDIR /fast

COPY package.json .

RUN npm install --force

COPY . .

RUN npx prisma generate

RUN npm run build

ENV NODE_ENV production

EXPOSE 3333


CMD [  "npm", "run", "start:prod" ]