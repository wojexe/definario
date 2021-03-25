FROM node:14-alpine AS build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV VUE_APP_API_URL ##APIURL##
RUN npm run build


FROM nginx:stable-alpine

COPY run.sh /
COPY nginx/nginx.conf /etc/nginx/sites-avaliable/default
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "/run.sh" ]