#FROM node:22-alpine
#WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install
#RUN npm run build
#COPY . .

#EXPOSE 3000
#CMD ["npm", "start"]


#Build stage
FROM node:22-slim AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM node:22-slim AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["npm", "start"]
