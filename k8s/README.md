# DevOps

1. Cultura
2. Cargo
3. Devs & Ops + integrados

## Kubernetes

- Kubernetes(k8s): Automatizar a implantação, dimensionamento e gerenciamento de apps em container.
- Desenvolvido pela Google
- Orquestração de containers
- Disponibilizado através de um conjunto de APIs
- Normalmente acessada usando a CLI: kubectl
- Tudo baseado em estado. Configuramos o estado de cada objeto
- Kubernetes trabalha em cluster
  - Tem um nó Master com os serviços: Kube-apiserver, Kube-controller-manager e Kube-scheduler
  - Os outros nós (nodes) possuem os: Kubelet e Kubeproxy
- Cada node (máquina) tem vCPU e Memória

1. Pod

- Pod é um container provisionado, processo rodando no cluster
- O Pod pode ter mais de um container dentro, mais o normal é um container por Pod

2. Deployment

- Objeto para provisionar um Pod informa o número de réplicas que um Pod terá (replicaset)
- Cada nó pode conter vários Pods até não tiver mais recursos para provisioná-los
- Nesse caso o Kubernetes aguarda o nó ter mais recursos(+ vCPU e memória) ou ter mais nós no cluster
- Caso um nó caia os serão provisionados os pods em outro nó do cluster
- Verifica a saúde dos Pod se travar, para de responder, ele mata e sobe outro

### Confluence Cloud

> Apache Kafka

- Criar cluster basic na Google Cloud
- Criar API Key e secret em Clients e copiar para adicionar nos .env das apps
- Adicionar os Topics com 6 partições e 3 réplicas

### GCP - Google Cloud Platform

> Kubernetes engine

- Criar cluster standard com 2 nodes
- Cluster connect com gcloud

### Apps

- Fazer o build das images docker para produção:

        docker build -t nome-conta-docker-hub/nome-da-imagem -f Dockerfile.prod

- Fazer o push das images para o docker hub:

        docker push nome-conta-docker-hub/nome-da-imagem

### Na máquina de desenvolvimento

- Fazer build de produção do simulador e empurrar para o docker hub

- Instalar o kubectl

- Instalar o gcloud sdk

- Aplicar no kubectl o configmap do simulador

- Aplicar no kubectl o deploy do simulador

### Comandos kubectl

- Aplicar:

        kubectl apply -f nome-do-arquivo.yaml

- Ver nós:

        kubectl get nodes

- Ver pods:

        kubectl get pods

- Ver logs:

        kubectl logs nome-do-pod

- Ver services:

        kubectl get svc

### MongoDB no Kubernetes

- Instalar:

        helm install mongodb bitnami/mongodb --set=auth.rootPassword="root",auth.database="nest",auth.username="root"

- Copiar e rodar o root password: 
        
        export MONGODB_ROOT_PASSWORD=$(...)

- Conectar no db copiando e executando o comando: 

        kubectl run --namespace default mongodb-client ...

- Popular o banco nest com os dados do /.docker/mongo/init.js

        use nest

        copiar e executar o conteúdo do arquivo

- Verificar se está rodando

        kubectl get pods

        kubectl get svc

### Continuando na máquina de desenvolvimento

- Fazer build de produção do backend e empurrar para o docker hub

- Aplicar no kubectl o configmap do backend

- Aplicar no kubectl o deploy do backend

- Ver logs do backend

- Aplicar no kubectl o service do backend

- Ver services e pegar o IP Externo do backend e testar no browser adicionando a porta e url

- Adicionar o IP Externo no .env do frontend

- Fazer build de produção do frontend e empurrar para o docker hub

- Aplicar no kubectl o deploy do frontend

- Aplicar no kubectl o service do frontend

- Ver services e pega o IP Externo do frontend e testar no browser

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
