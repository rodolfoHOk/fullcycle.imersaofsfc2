# Code Delivery - Nest API 🚀

> Projeto criado durante a Imersão 8 FullStack FullCycle

## 👨‍💻 Tecnologias e bibliotecas utilizadas 👩‍💻

- Typescript : Linguagem programação
- NodeJs : JavaScript runtime
- NestJs : Framework web para NodeJs
- MongoDB : Banco de dados não relacional
- Kafka : Plataforma de processamento de streams
- WebSocket : Comunicação bidirecional realtime

### 📚 bibliotecas adicionais 🗃️

- mongoose
- @nestjs/mongoose
- @nestjs/config
- kafkajs
- @nestjs/microservices

## 📖 Guia 📃

- Criando um projeto NestJs:

        npx @nestjs/cli new nome-do-projeto
        y
        npm

- Colocando o projeto em um container Docker:

        criar o Dockerfile:
          FROM node:16-alpine
          RUN apk add --no-cache bash
          RUN npm install -g @nestjs/cli@8.0.0
          USER node
          WORKDIR /home/node/app

        criar o docker-compose.yaml:
          version: '3'
          services:
            app:
              build: .
              entrypoint: ./.docker/entrypoint.sh
              ports:
                - 3000:3000
              volumes:
                - .:/home/node/app

        criar o .docker/entrypoint.sh:
          #!/bin/bash
          npm install
          npm run start:dev

        no arquivo tsconfig.json adicionar:
            ...
            },
            "include": ["src"],
            "exclude": ["node_modules", "dist", ".docker"]
          }

        docker build . //se o comando abaixo der erro: para conseguir baixar a imagem base

        docker-compose up

- Executando o bash centro do docker:

        docker-compose exec app bash

- Criando recurso routes no Nest:

        nest generate resource routes
        REST API
        Y

- Adicionando o MongoDB ao docker-compose.yaml:

        adicionar em services:
          db:
            image: mongo:4.4
            restart: always
            volumes:
              - ./.docker/dbdata:/data/db
              - ./.docker/mongo:/docker-entrypoint-initdb.d
            environment:
              - MONGO_INITDB_ROOT_USERNAME=root
              - MONGO_INITDB_ROOT_PASSWORD=root
              - MONGO_INITDB_DATABASE=nest

        adicionar no app:
          depends_on:
            - db

- Adicionando o mongo-express ao docker-compose.yaml:

        adicionar em services:
          mongo-express:
            image: mongo-express
            restart: always
            ports:
              - 8081:8081
            environment:
              - ME_CONFIG_MONGODB_SERVER=db
              - ME_CONFIG_MONGODB_AUTH_USENAME=root
              - ME_CONFIG_MONGODB_AUTH_PASSWORD=root
              - ME_CONFIG_MONGODB_ADMINUSERNAME=root
              - ME_CONFIG_MONGODB_ADMINPASSWORD=root
            depends_on:
              - db

- Adicionar dados iniciais no banco:

        criar arquivo arquivo .docker/mongo/init.js:
          db.routes.insertMany([
            {
              _id: '1',
              title: 'Primeiro',
              startPosition: { lat: -15.82594, lng: -47.92923 },
              endPosition: { lat: -15.82942, lng: -47.92765 },
            },
            {
              _id: '2',
              title: 'Segundo',
              startPosition: { lat: -15.82449, lng: -47.92756 },
              endPosition: { lat: -15.8276, lng: -47.92621 },
            },
            {
              _id: '3',
              title: 'Terceiro',
              startPosition: { lat: -15.82331, lng: -47.92588 },
              endPosition: { lat: -15.82758, lng: -47.92532 },
            },
          ]);

- adicionar no docker-compose.yaml:

        no app:
          extra_hosts:
            - "host.docker.internal:172.17.0.1"

- adicionar no /etc/hosts:

        127.0.0.1 host.docker.internal

- Instalando o WebSocket no Nest:

        npm install @nestjs/websockets @nestjs/platform-socket.io
        npm install -D @types/socket.io

- Gerando o gateway de routes para o WebSocket

        nest g gateway routes/routes

## 🔥 Links da Imersão FullCycle 8 ✨

Imersão:

- [Simulator](https://github.com/rodolfoHOk/fullcycle.imersaofsfc2/tree/main/simulator)

- [Apache Kafka (docker-compose)](https://github.com/rodolfoHOk/fullcycle.imersaofsfc2/tree/main/apache-kafka)

- [Nest-API](https://github.com/rodolfoHOk/fullcycle.imersaofsfc2/tree/main/nest-api)

- [React-FrontEnd](https://github.com/rodolfoHOk/fullcycle.imersaofsfc2/tree/main/react-frontend)

- [Integração e Dashboard](https://github.com/rodolfoHOk/fullcycle.imersaofsfc2/tree/main/kafka-with-connect)

- [DevOps Kubernetes](https://github.com/rodolfoHOk/fullcycle.imersaofsfc2/tree/main/k8s)

Esquenta: 

- [Arquitetura Limpa com Typescript](https://github.com/rodolfoHOk/fullcycle.typescrit-clean-arch)

- [React Maps](https://github.com/rodolfoHOk/fullcycle.react-maps)

- [Go Iniciando do Zero](https://github.com/rodolfoHOk/fullcycle.go-init-from-zero)
