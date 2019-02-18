FROM node:10.9

# Create app directory
#RUN mkdir /app
WORKDIR /myapp

COPY / /myapp

RUN npm install

EXPOSE 3000

CMD ["node","index.js"]
