// * 쿠키 인터페이스
export interface CookieOptions {
  maxAge: number;
  expires?: Date;
  httpOnly: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  domain?: string;
}

// * 쿠키 옵션 설정
const isProduction = process.env.NODE_ENV === 'production';
export const cookieOptions: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24, // 24시간
  httpOnly: true, // 브라우저에서 js 접근금지
  secure: isProduction, // https에서만 요청 가능하도록 배포 환경에서는 true
  sameSite: isProduction ? 'strict' : 'lax', // 로컬에서는 lax
  domain: isProduction ? process.env.FRONT_DOMAIN : undefined, // 로컬에서는 domain 생략
};
