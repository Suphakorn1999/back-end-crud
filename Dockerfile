FROM node:18-alpine as build
WORKDIR /src
COPY package.json tsconfig.json ./
RUN apk update && npm install
ADD . ./
ENV DB_HOST=localhost
ENV DB_PORT=3306
ENV DB_DATABASE=crud-database
ENV DB_USERNAME=root
ENV DB_PASSWORD=1234
ENV DB_SYNCHRONIZE=true
ENV DB_LOGGING=true
ENV DB_AUTOLOADENTITIES=true
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /src/dist /app/dist
COPY --from=build /src/node_modules /app/node_modules
COPY --from=build /src/package.json /app/package.json
COPY --from=build /src/.env /app/.env

EXPOSE 8082
CMD ["npm","run","start:prod"]
