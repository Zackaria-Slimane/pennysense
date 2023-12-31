FROM node:20.9-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install serve -g
RUN npm ci
RUN npm run build
COPY . .
EXPOSE 3000
CMD ["npm", "run", "serve"]
