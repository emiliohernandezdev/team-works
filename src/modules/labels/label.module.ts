import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabelSchema } from './label.schema';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';
import { LabelGateway } from './label.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Label', schema: LabelSchema }]),
    ],
    providers: [
        LabelService,
        LabelGateway
    ],
    controllers: [
        LabelController
    ],
})
export class LabelModule { }
