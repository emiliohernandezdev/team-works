import {WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import {Socket} from 'socket.io'

@WebSocketGateway({namespace: 'projects'})
export class ProjectGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server;

    async handleConnection(){

    }

    async handleDisconnect(){

    }

    @SubscribeMessage('project')
    async onLabel(client: Socket, project){
        client.broadcast.emit('project', project);
    }
}