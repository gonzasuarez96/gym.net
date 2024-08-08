import { User } from '../../../database/models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env as {
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
};

interface DecodedToken {
  email: string;
  iat: number;
  exp: number;
}

interface CustomError extends Error {
  status?: number;
}

const refreshToken = async (cookies: Record<string, any>): Promise<string> => {
  if (!cookies?.jwt) {
    const error: CustomError = new Error("Missing refresh token.");
    error.status = 401;
    throw error;
  }

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ where: { refreshToken: refreshToken } });
  if (!foundUser) {
    const error: CustomError = new Error("No user found with that refresh token.");
    error.status = 403;
    throw error;
  }

  let newAccessToken: string;

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as DecodedToken;

    if (foundUser.email !== decoded.email) {
      const error: CustomError = new Error("User with a refresh token from another user.");
      error.status = 403;
      throw error;
    }

    newAccessToken = jwt.sign(
      { email: decoded.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: 60 * 60 } // 1 hour
    );
  } catch (err) {
    const error: CustomError = new Error((err as Error).message);
    error.status = 403;
    throw error;
  }

  return newAccessToken;
};

export { refreshToken };
