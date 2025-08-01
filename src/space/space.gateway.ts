// src/space/space.gateway.ts
import { Injectable } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SpaceGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  // Client joins a specific space room
  @SubscribeMessage('joinSpace')
  handleJoinRoom(
    @MessageBody() spaceId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(spaceId);
    console.log(`Client ${client.id} joined space ${spaceId}`);
  }

}
