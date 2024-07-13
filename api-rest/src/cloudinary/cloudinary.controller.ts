import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  //   @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  //   @Post('uploadImage/:id')
  @Post('uploadImage')
  //   @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    // @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5000000,
            message: 'Image size must be less than 5MB',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|gif|svg)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.cloudinaryService.uploadImageCloudinary(file);
  }
}
