import * as AWS from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
dotenv.config();
export const saveImage = async (imageBase64: string, id: number) => {
  const s3 = new AWS.S3({
    region: 'ca-central-1',
    credentials: {
      accessKeyId: process.env.AWS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET as string,
    },
  });

  await s3.putObject({
    Bucket: 'fasttraiteur',
    Key: `meal-images/meal-${id}-image.jpg`,
    Body: Buffer.from(
      imageBase64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    ),
  });

  const imageUrl = `https://fasttraiteur.s3.ca-central-1.amazonaws.com/meal-images/meal-${id}-image.jpg`;
  return imageUrl;
};
