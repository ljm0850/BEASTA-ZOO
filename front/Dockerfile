FROM node:16-alpine as build-stage
WORKDIR /var/lib/jenkins/workspace/deploytest_front/front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls
FROM nginx:stable-alpine as production-stage

COPY /home/ubuntu/keys /etc/letsencrypt/live/j7c108.p.ssafy.io

COPY --from=build-stage /var/lib/jenkins/workspace/deploytest_front/front/build /usr/share/nginx/html
COPY --from=build-stage /var/lib/jenkins/workspace/deploytest_front/front/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]