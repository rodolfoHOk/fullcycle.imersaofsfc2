# 🚀 Code Delivery - Simulator

> Simulador de trajetos de GPS

> Projeto criado durante a Imersão FullStack & Full Cycle 8

## 👨‍💻 Tecnologias e bibliotecas utilizadas 👩‍💻

- Go : Linguagem de programação
- Kafka : Plataforma de processamento de streams

### 📚 bibliotecas adicionais 🗃️

- github.com/confluentinc/confluent-kafka-go/kafka
- github.com/joho/godotenv

## 📖 Guia 📃

- Rodar o projeto no container

        na pasta simulator:
        docker-compose up -d

- Rodar o Bash do Simulator

        docker exec -it simulator bash

- Rodar o Kafka em container

        na pasta apache-kafka:
        docker-compose up -d

- Abrir um consumer no Kafka do container

        docker exec -it apache-kafka_kafka_1 bash
        kafka-console-consumer --bootstrap-server=localhost:9092 --topic=readtest --group=terminal

- Abrir um producer no Kafka do container

        docker exec -it apache-kafka_kafka_1 
        kafka-console-producer --bootstrap-server=localhost:9092 --topic=readtest

- Json de Teste

        {"clientId":"1","routeId":"1"}
        {"clientId":"2","routeId":"2"}

## 🔥 Links da Imersão FullCycle 8 ✨

Imersão:

- [Simulator](https://github.com/rodolfoHOk/fullcycle.imersaofsfc8/tree/main/simulator)

- [Apache Kafka (docker-compose)](https://github.com/rodolfoHOk/fullcycle.imersaofsfc8/tree/main/apache-kafka)

- [Nest-API](https://github.com/rodolfoHOk/fullcycle.imersaofsfc8/tree/main/nest-api)

- [React-FrontEnd](https://github.com/rodolfoHOk/fullcycle.imersaofsfc8/tree/main/react-frontend)

- [Integração e Dashboard](https://github.com/rodolfoHOk/fullcycle.imersaofsfc8/tree/main/kafka-with-connect)

- [DevOps Kubernetes](https://github.com/rodolfoHOk/fullcycle.imersaofsfc8/tree/main/k8s)

Esquenta: 

- [Arquitetura Limpa com Typescript](https://github.com/rodolfoHOk/fullcycle.typescrit-clean-arch)

- [React Maps](https://github.com/rodolfoHOk/fullcycle.react-maps)

- [Go Iniciando do Zero](https://github.com/rodolfoHOk/fullcycle.go-init-from-zero)
