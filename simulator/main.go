package main

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
	"github.com/rodolfoHOk/fullcycle.imersaofsfc2/simulator/infra/kafka"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	kafkaApp "github.com/rodolfoHOk/fullcycle.imersaofsfc2/simulator/application/kafka"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
}

func main() {
	msgChan := make(chan *ckafka.Message)
	consumer := kafka.NewKafkaConsumer(msgChan)
	go consumer.Consume()
	for msg := range msgChan {
		fmt.Println(string(msg.Value))
		go kafkaApp.Produce(msg)
	}
}
