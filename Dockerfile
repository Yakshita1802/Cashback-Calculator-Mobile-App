FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./
#Copying package.json, package.json-lock with their dependencies
RUN npm install
COPY . .

#Exposing ports
EXPOSE 8080
#Start command
CMD ["npx", "expo"]