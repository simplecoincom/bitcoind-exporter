FROM node:21.2-alpine3.18

ENV NODE_ENV=production \
    NPM_CONFIG_LOGLEVEL=error \
    NPM_CONFIG_PREFIX=/home/node/.npm-global

COPY . /app/

WORKDIR /app/

RUN npm i

EXPOSE 9439

ENTRYPOINT ["node", "-r", "dotenv/config", "index.js"]
