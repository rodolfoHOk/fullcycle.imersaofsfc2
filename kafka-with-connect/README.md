# Integração e visualização de dados

> Apache Kafka, Kafka Connect, Elasticsearch e Kibana

## Rodar em containers

- No bash executar o comando: docker-compose up -d

## Connect configuração:

- Criar na pasta connectors o arquivo de configuração elasticsearch.properties:

        name=elasticsearch-sink
        connector.class=io.confluent.connect.elasticsearch.ElasticsearchSinkConnector
        topics=route.new-direction,route.new-position
        connection.url=http://es01:9200
        type.name=_doc
        value.converter=org.apache.kafka.connect.json.JsonConverter
        value.converter.schemas.enable=false
        schema.ignore=true
        key.ignore=true
        transforms=InsertField
        transforms.InsertField.type=org.apache.kafka.connect.transforms.InsertField$Value
        transforms.InsertField.timestamp.field=timestamp

- Acessar localhost:9021

        -> cluster 1 - Connect -> Add connector -> Upload connector config file
          selecionar o arquivo elasticsearch.properties -> Continue -> Launch

## Kibana

- Acessar localhost:5601

- Configurar Kibana no dev tools adicionar mapping com geo_point e timestamp

- No Kibana criar index pattern para route.new-direction e route.new-position selecionado o time field

- Criar visualizações no lens: 
  1. metrics de quantidade corridas (records) 
  2. metrics de browser conectados (clientId)
  3. data table de quantidade de corridas para cada rota (routeId)
  4. pie graph de quantidade de corridas para cada rota (routeId)

- Criar visualização de mapa no maps com filtro por rota

- Criar o dashboard com as visualizações

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
