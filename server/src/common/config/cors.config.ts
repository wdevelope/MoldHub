// cors 설정. env파일 배열로
const whitelist = (process.env.CORS_WHITELIST || "").split(",");

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: ["Authorization", "Content-Disposition"],
};

export default corsOptions;
