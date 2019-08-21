FROM node:10

WORKDIR /app

COPY package*.json ./

#RUN npm install -g prisma
#RUN npm install
RUN npm install nodemon -g --quiet

COPY . .

EXPOSE 4000
CMD npm start