FROM node:20.11.1-alpine3.19

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm install
RUN npm install nodemon --save-dev

CMD ["npm", "run", "start:nodemon"]
