FROM node:16.14.2

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i --save --legacy-peer-deps

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev:server"]
