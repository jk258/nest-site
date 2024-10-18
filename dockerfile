FROM node:20.12.2-alpine as build-stage

WORKDIR /app

# 构建后端
COPY ./*.json ./

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install

COPY . .

RUN npm run build

# 构建前端
RUN cd client && npm install && npm run build

# production stage
FROM node:20.12.2-alpine as production-stage

WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
Copy --from=build-stage /app/prisma /app/prisma
COPY package*.json ./

COPY --from=build-stage /app/client/dist /app/static

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install --production
COPY .env.prod .env
RUN npx prisma migrate dev --name init
EXPOSE 3000

CMD ["node", "/app/dist/main.js"]
