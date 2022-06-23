import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class RoutesGateway implements OnModuleInit {
  private kafkaProducer: Producer;

  @WebSocketServer()
  private server: Server;

  constructor(
    @Inject('KAFKA_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaProducer = await this.kafkaClient.connect();
  }

  @SubscribeMessage('new-direction')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { routeId: string },
  ) {
    this.kafkaProducer.send({
      topic: 'route.new-direction',
      messages: [
        {
          key: 'route.new-direction',
          value: JSON.stringify({
            routeId: payload.routeId,
            clientId: client.id,
          }),
        },
      ],
    });
  }

  senPosition(data: {
    clientId: string;
    routeId: string;
    position: [number, number];
    finished: boolean;
  }) {
    const { clientId, ...rest } = data;
    const clients = this.server.sockets.sockets;
    if (!clients.has(clientId)) {
      console.error(
        'Client not exists, refresh application webpage and resend new direction again.',
      );
      return;
    }
    clients.get(clientId).emit('new-position', rest);
  }
}
