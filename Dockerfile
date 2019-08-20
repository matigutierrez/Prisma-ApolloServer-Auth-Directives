FROM node:10

WORKDIR /PrismaApollo

COPY package*.json ./

RUN npm install -g prisma
RUN npm install

COPY . .

EXPOSE 4000
CMD [ "npm", "start" ]