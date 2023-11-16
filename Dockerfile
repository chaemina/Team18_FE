# Build stage
FROM krmp-d2hub-idock.9rum.cc/goorm/node:16 AS build
WORKDIR /usr/src/app

ENV VITE_TALKPLUS_APP_ID="7e9a61f5-c04a-4b27-aee0-0fd568bdb6cb"
ENV VITE_API_URL="https://k6306e208fe94a.user-app.krampoline.com"

COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Run stage
FROM krmp-d2hub-idock.9rum.cc/goorm/node:16
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist"]