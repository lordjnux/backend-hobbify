import { Injectable } from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { CloudinaryDto } from '../dtos/cloudinary/cloudinary.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CloudinaryService {
  constructor(private readonly cloudinaryRepository: CloudinaryRepository) {}

  async uploadImageCloudinary(
    file: Express.Multer.File,
  ): Promise<CloudinaryDto> {
    const result = await this.cloudinaryRepository.uploadImageCloudinary(file);
    return plainToClass(CloudinaryDto, result);
  }
}
