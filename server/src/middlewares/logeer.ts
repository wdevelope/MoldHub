import { Request } from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Meta 타입 정의
interface Meta {
  req?: Request; // Express Request 타입
}

// 로그 파일 설정
const errorTransport = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

// 커스텀 로그 포맷 정의
const logFormat = winston.format.printf(
  ({ level, message, timestamp, meta }) => {
    const { req } = (meta as Meta) || {}; // 타입 단언 사용
    const url = req?.originalUrl || 'unknown URL';
    const method = req?.method || 'unknown method';
    return `${timestamp} ${level}: ${message} - Method: ${method} - URL: ${url}`;
  }
);

// Logger 설정
const logger = expressWinston.errorLogger({
  transports: [errorTransport, new winston.transports.Console()],
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  meta: true,
  msg: 'middlewareError: {{err.message}}',
});

export default logger;
