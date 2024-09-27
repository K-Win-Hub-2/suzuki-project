FROM node:alpine

WORKDIR /usr/src/suzuki

COPY package*.json ./ 

COPY package.json package-lock.json ./

RUN npm cache clean --force && npm i --save

# Create necessary directories (like /public/excel)
RUN mkdir -p /usr/src/suzuki/public/excel

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]