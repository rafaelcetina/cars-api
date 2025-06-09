#FROM node:22-alpine
#WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install
#COPY . .

#EXPOSE 3000
#CMD ["npm", "start"]


#Build stage
FROM node:22-slim

WORKDIR /app

COPY package*.json .

RUN npm install && npm run build

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
