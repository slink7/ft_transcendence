FROM node:20

WORKDIR /app

COPY /tools/package*.json /
COPY /tools/tsconfig.json /
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
