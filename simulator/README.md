# 🚀 Simulator

> Simulador de trajetos de GPS

> Projeto criado durante a Imersão FullStack & Full Cycle 2

## 👨‍💻 Tecnologias e bibliotecas utilizadas 👩‍💻

- Go : Linguagem de programação

### 📚 bibliotecas adicionais 🗃️

- 

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

## 🔗 Links úteis ✨

- 
## 🔥 Repositórios da imersão e do esquenta 🔥

Imersão:

- [Simulator](./simulator/README.md)

- [Apache Kafka (docker-compose)](./apache-kafka/docker-compose.yaml)

Esquenta: 

- [Arquitetura Limpa com Typescript](https://github.com/rodolfoHOk/fullcycle.typescrit-clean-arch)

- [React Maps](https://github.com/rodolfoHOk/fullcycle.react-maps)

- [Go Iniciando do Zero](https://github.com/rodolfoHOk/fullcycle.go-init-from-zero)
