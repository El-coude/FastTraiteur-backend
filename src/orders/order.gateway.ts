import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { Order } from '@prisma/client';
@WebSocketGateway({ cors: { origin: '*' } })
export class OrderGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor() {}

  @WebSocketServer() wss: Server;
  wsClients: Socket[] = [];

  afterInit(server: Server) {
    console.log('Initialized');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client?.id}`);
    client.send('newOrder', { data: 'test' });
  }

  notifyOrderCreation() {
    console.log('hmmmm');

    for (let client of this.wsClients) {
      client.send('newOrder', 'data');
    }
  }
}
