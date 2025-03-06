import { DataSource } from 'typeorm';
import { User } from '../../models/user.model';
import { Quote } from '../../models/quote.model';
import { Request } from '../../models/request.model';

const isProduction = process.env.NODE_ENV === 'production'; // 배포 환경 여부 확인

export const DB = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  schema: process.env.POSTGRES_SCHEMA,
  synchronize: true,
  logging: false,
  // 모델 엔티티 들어가는곳
  entities: [User, Quote, Request],
  subscribers: [],
  migrations: [],
  ...(isProduction
    ? {
        ssl: {
          rejectUnauthorized: false, // 배포 환경에서 SSL 설정 추가
        },
      }
    : {}),
});
