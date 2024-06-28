import { Injectable } from '@nestjs/common';
import { cloudinaryUploader } from '../util/cloudinary-uploader';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryRepository {
  async uploadImageCloudinary(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return new Promise(cloudinaryUploader(file));
  }
}
