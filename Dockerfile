FROM node:18.12-alpine

WORKDIR /app

EXPOSE 3000

COPY . .

RUN npm install

CMD ["node", "server"]
