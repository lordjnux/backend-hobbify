import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryRepository } from './cloudinary.repository';
import { CloudinaryController } from './cloudinary.controller';
import { cloudinaryConfig } from '../config/cloudinary.config';

@Module({
  providers: [cloudinaryConfig, CloudinaryService, CloudinaryRepository],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
