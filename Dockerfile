FROM node:12.18.1-alpine AS base
RUN npm install -g @vue/cli
WORKDIR /var/www/html
COPY ./package*.json ./
RUN npm install
COPY . ./

# For build stage
FROM base AS development
WORKDIR /var/www/html
COPY --from=base /var/www/html /var/www/html
EXPOSE 80
ENTRYPOINT npm run serve -- --host=0.0.0.0 --port 80 --public

# For build stage
FROM base AS build
WORKDIR /var/www/html
COPY --from=development /var/www/html /var/www/html
RUN npm run build -- --no-fix-warnings

# For production stage
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /var/www/html/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
