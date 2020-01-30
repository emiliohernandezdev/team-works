import {WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import {Socket} from 'socket.io'

@WebSocketGateway({namespace: 'labels'})
export class LabelGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server;

    async handleConnection(){

    }

    async handleDisconnect(){

    }

    @SubscribeMessage('label')
    async onLabel(client: Socket, label){
        client.broadcast.emit('label', label);
    }
}