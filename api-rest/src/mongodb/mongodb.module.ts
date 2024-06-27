import { Module } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { MongodbController } from './mongodb.controller';

@Module({
  controllers: [MongodbController],
  providers: [MongodbService],
})
export class MongodbModule {}
