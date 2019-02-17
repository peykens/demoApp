FROM node:10.9

# Create app directory
#RUN mkdir /app
WORKDIR /

COPY / /

RUN npm install

EXPOSE 3001

CMD ["node","index.js"]
