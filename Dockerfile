FROM node:14.16-alpine3.10
        
COPY ./server/ /home/my_app/ 

RUN ls /home/my_app

WORKDIR /home/my_app/

RUN npm install pm2 -g
RUN npm install dotenv express jsonwebtoken bcryptjs mysql2
        
EXPOSE 4500:4500
        
CMD [ "pm2-runtime" ,"src/index.js"]
        