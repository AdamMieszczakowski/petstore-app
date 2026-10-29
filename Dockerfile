# Etap 1: Budowanie aplikacji
FROM node:20-alpine AS build

WORKDIR /app

# Kopiowanie plików definicji pakietów
COPY package*.json ./

# Instalacja zale¿noœci
RUN npm install

# Kopiowanie reszty kodu Ÿród³owego
COPY . .

# Kompilacja aplikacji produkcyjnej (do folderu dist)
RUN npm run build

# Etap 2: Serwowanie przez lekki serwer Nginx
FROM nginx:alpine

# Kopiowanie w³asnej konfiguracji Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Kopiowanie skompilowanych plików z pierwszego etapu
COPY --from=build /app/dist /usr/share/nginx/html

# Port nas³uchiwania
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]