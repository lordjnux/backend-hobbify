import { v2 as cloudinary } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

export const cloudinaryUploader = (file) => {
  console.log('util:uploader...');

  return (resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        console.log('return:error');
        console.log(error);
        console.log('return:result');
        console.log(result);

        error ? reject(error) : resolve(result);
      },
    );

    console.log('upload:');
    console.log(upload);
    toStream(file.buffer).pipe(upload);
  };
};
