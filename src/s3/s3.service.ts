import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

dotenv.config();

@Injectable()
export class S3Service {
  private s3: S3Client;
}
