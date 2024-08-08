import { User } from "../../../database/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface ProcessEnv {
  ACCESS_TOKEN_SECRET?: string;
  REFRESH_TOKEN_SECRET?: string;
}

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env as ProcessEnv;

interface UserLoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    last_name: string;
    role: string;
  };
}

const userLogin = async (email: string, password: string): Promise<UserLoginResponse> => {
  if (!email || !password) {
    const error = new Error("Email and password are required.");
    (error as any).status = 400; // Bad request
    throw error;
  }
  const foundUser = await User.findOne({ where: { email: email } });
  if (!foundUser) {
    const error = new Error("Email not registered.");
    (error as any).status = 401;
    throw error;
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    const error = new Error("Incorrect password.");
    (error as any).status = 401;
    throw error;
  }

  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("JWT secrets are not defined.");
  }
  const accessToken = jwt.sign(
    {
      id: foundUser.id, // Incluye el ID
      email: foundUser.email,
      role: foundUser.role // Incluye el role
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: 60 * 60 } // 1 hora
  );
  const refreshToken = jwt.sign({ email: foundUser.email }, REFRESH_TOKEN_SECRET, {
    expiresIn: 24 * 60 * 60
  });
  await foundUser.update({ refreshToken });
  console.log(foundUser);
  return {
    accessToken,
    refreshToken,
    user: {
      id: foundUser.dataValues.id,
      email: foundUser.dataValues.email,
      name: foundUser.dataValues.name,
      last_name: foundUser.dataValues.last_name,
      role: foundUser.dataValues.role
    }
  };
};

module.exports = { userLogin };
