import { Injectable } from '@nestjs/common';

@Injectable()
export class MongodbService {
  create(createMongodbDto: any) {
    return 'This action adds a new mongodb';
  }

  findAll() {
    return `This action returns all mongodb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mongodb`;
  }

  update(id: number, updateMongodbDto: any) {
    return `This action updates a #${id} mongodb`;
  }

  remove(id: number) {
    return `This action removes a #${id} mongodb`;
  }
}
