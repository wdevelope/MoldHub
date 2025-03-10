import multer from 'multer';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3Client from '../common/config/s3';
import iconv from 'iconv-lite';
import { HttpError } from '../common/errors/HttpError';

// * 메모리 스토리지를 사용하는 multer 설정
// 파일을 메모리에 저장하여 후속 작업에서 사용할 수 있도록
const storage = multer.memoryStorage();

// * multer 미들웨어 생성
// 메모리 스토리지 설정을 사용하여 파일 업로드를 처리하는 미들웨어를 생성
const upload = multer({ storage });

// * S3에 파일 업로드
// 업로드된 파일을 Amazon S3에 저장하고, 저장된 파일의 URL을 반환
const uploadToS3 = async (file: Express.Multer.File, folderPath: string) => {
  // ^ 파일명을 UTF-8로 변환 (한글 파일명이 깨지는 문제 해결 위함 - iconv-lite 사용)
  const utf8FileName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'UTF-8');

  // S3 경로, 파일명
  const key = `MoldHub/${folderPath}/${utf8FileName}`;

  // S3 파라미터
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    // S3에 파일 업로드 명령 생성 및 실행
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    return `${process.env.AWS_S3_BUCKET_URL}/${key}`;
  } catch (error) {
    console.log(error);
    throw new HttpError(400, 'Failed to upload file to S3');
  }
};

export { upload, uploadToS3 };
