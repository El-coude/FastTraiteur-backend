FROM node:18

WORKDIR /fast

COPY package.json .

RUN npm install 

COPY . .

RUN npx prisma generate
EXPOSE 3333


CMD [  "npm", "run", "start" ]