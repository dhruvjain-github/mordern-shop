FROM node:18-alpine 
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN mkdir -p /migration && cp -r /app/data /migration/
CMD ["node", "migrate.js"]