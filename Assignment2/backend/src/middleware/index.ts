interface UserBasicInfo {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

export * from './authMiddleware.js'
