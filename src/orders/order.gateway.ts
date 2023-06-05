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

@WebSocketGateway(3334, { cors: { origin: '*', allowedHeaders: true } })
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
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] == client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('new client connected');
    this.wsClients.push(client);
  }

  handleOrderCreation(order: any) {
    for (let client of this.wsClients) {
      client.send(JSON.stringify(order));
    }
  }
}
