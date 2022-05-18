FROM node:latest 

RUN mkdir -p /usr/src/app  

WORKDIR /usr/src/app  

COPY package*.json /usr/src/app/
COPY backend /usr/src/app/backend

EXPOSE 5000

RUN npm install  

CMD ["npm", "start"]  
