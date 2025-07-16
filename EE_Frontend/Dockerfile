# Etapa 1: Build del proyecto
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Imagen final para producción
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]
