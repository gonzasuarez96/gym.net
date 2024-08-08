import { Request, Response } from 'express';
import { refreshToken } from '../controllers/refreshController';

const refreshTokenHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const cookies = req.cookies as Record<string, any>;
    const newAccessToken = await refreshToken(cookies);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status((error as any).status || 500).json({ error: (error as Error).message });
  }
};

export { refreshTokenHandler };
