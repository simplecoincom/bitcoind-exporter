FROM node:23.11.1-alpine3.21

ENV NODE_ENV=production \
    NPM_CONFIG_LOGLEVEL=error \
    NPM_CONFIG_PREFIX=/home/node/.npm-global

COPY . /app/

WORKDIR /app/

RUN npm i

EXPOSE 9439

ENTRYPOINT ["node", "-r", "dotenv/config", "index.js"]
