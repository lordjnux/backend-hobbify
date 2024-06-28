import { Expose, Transform } from 'class-transformer';

export class CloudinaryDto {
  @Expose()
  asset_id: string;

  @Expose()
  public_id: string;

  @Expose()
  version: number;

  @Expose()
  version_id: string;

  @Expose()
  signature: string;

  @Expose()
  width: number;

  @Expose()
  height: number;

  @Expose()
  format: string;

  @Expose()
  resource_type: string;

  @Expose()
  @Transform(({ value }) => new Date(value))
  created_at: Date;

  @Expose()
  tags: any[];

  @Expose()
  bytes: number;

  @Expose()
  type: string;

  @Expose()
  etag: string;

  @Expose()
  placeholder: boolean;

  @Expose()
  url: string;

  @Expose()
  secure_url: string;

  @Expose()
  folder: string;

  @Expose()
  original_filename: string;

  @Expose()
  api_key: string;
}
