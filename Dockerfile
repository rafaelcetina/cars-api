#Build stage
FROM node:22-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

RUN npm run migrate

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the application's port
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
