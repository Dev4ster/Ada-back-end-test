FROM node:14
WORKDIR /usr
COPY ./yarn.lock ./
COPY ./package.json ./
COPY ./public ./public
COPY src ./src
RUN ls -a
RUN yarn
RUN yarn build


COPY . .