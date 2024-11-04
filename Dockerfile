FROM node:20-slim

WORKDIR /app

COPY package*.json ./
COPY schema.sql ./
COPY src ./src

RUN apt-get update && apt-get install -y \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*
    
RUN npm install

VOLUME ["/app/data"]

CMD ["node", "src/index.js"]