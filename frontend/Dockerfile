# build env
FROM node as build
WORKDIR /usr/src/app 

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build 

#production
FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf  

COPY nginx.conf /etc/nginx/conf.d

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]