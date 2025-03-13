#  Usar la imagen oficial de Node.js
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del frontend
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

#  Construir la aplicación
RUN npm run build

#  Servir la aplicación con una imagen optimizada
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000

# Ejecutar Next.js en modo producción
CMD ["npm", "run", "start"]
