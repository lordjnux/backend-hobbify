import { v2 as cloudinary } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

export const cloudinaryUploader = (file) => {
  return (resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        error ? reject(error) : resolve(result);
      },
    );

    toStream(file.buffer).pipe(upload);
  };
};
