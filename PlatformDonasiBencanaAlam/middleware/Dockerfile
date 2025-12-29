FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN NODE_ENV=production npm install

COPY server.js .

EXPOSE 8000

CMD ["npm", "start"]
