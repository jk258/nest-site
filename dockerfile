FROM node:20.12.2-alpine AS build-stage


WORKDIR /app

# 构建后端
COPY ./*.json ./

RUN npm config set registry https://registry.npmmirror.com/ && npm install

COPY . .
RUN npm run build

# 构建前端
RUN cd client && npm install && npm run build

# production stage
FROM node:20.12.2-alpine AS production-stage

WORKDIR /app
RUN echo "https://mirrors.tuna.tsinghua.edu.cn/alpine/v3.4/main/" > /etc/apk/repositories && apk update && apk add --no-cache bash

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/prisma /app/prisma

COPY --from=build-stage /app/client/dist /app/static

COPY package*.json ./

COPY ./script.sh ./script.sh
RUN chmod +x /app/script.sh

RUN npm config set registry https://registry.npmmirror.com/ && npm install --production

CMD ["/app/script.sh"]
