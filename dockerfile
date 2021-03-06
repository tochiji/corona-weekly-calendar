FROM node:12-slim
RUN mkdir -p usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install -g serve
RUN yarn
RUN yarn build
EXPOSE 8080
CMD ["serve", "-s", "-l", "8080", "./build"]
