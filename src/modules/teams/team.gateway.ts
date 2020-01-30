import {WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import {Socket} from 'socket.io'

@WebSocketGateway({namespace: 'teams'})
export class TeamGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server;

    async handleConnection(){

    }

    async handleDisconnect(){

    }

    @SubscribeMessage('team')
    async onLabel(client: Socket, team){
        client.broadcast.emit('team', team);
    }
}