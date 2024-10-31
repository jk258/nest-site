#!/bin/bash
npx prisma migrate deploy --schema=./prisma/schema.prisma
npx prisma db seed
node /app/dist/main.js
