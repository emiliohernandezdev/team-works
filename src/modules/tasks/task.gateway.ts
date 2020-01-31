import {WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import {Socket} from 'socket.io'

@WebSocketGateway({namespace: 'tasks'})
export class TaskGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server;

    async handleConnection(){

    }

    async handleDisconnect(){

    }

    @SubscribeMessage('task')
    async onTask(client: Socket, task){
        client.broadcast.emit('task', task);
    }
}