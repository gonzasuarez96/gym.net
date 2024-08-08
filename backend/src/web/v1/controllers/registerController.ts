import { User } from '../../../database/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../../config';

interface UserBody {
  email: string;
  password: string;
  name: string;
  last_name: string;
  phone_number: string;
  address: string;
  birth_date: Date;
  role: string;
}

interface NewUser {
  id: string;
  email: string;
  name: string;
  last_name: string;
  phone_number: string;
  address: string;
  birth_date: Date;
  role: string;
}

export const newUserRegister = async (body: UserBody): Promise<{ user: NewUser; token: string }> => {
  const { email, password, name, last_name, phone_number, address, birth_date, role } = body;

  if (!email || !password) {
    const error = new Error('Email and password are required.');
    (error as any).status = 400;
    throw error;
  }

  try {
    const duplicate = await User.findOne({ where: { email } });
    if (duplicate) {
      const error = new Error('Email already registered.');
      (error as any).status = 409;
      throw error;
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPwd,
      name,
      last_name,
      phone_number,
      address,
      birth_date,
      role,
    });

    const token = jwt.sign({ userId: newUser.id }, config.jwt.secret, { expiresIn: '1d' });

    const user: NewUser = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      last_name: newUser.last_name,
      phone_number: newUser.phone_number,
      address: newUser.address,
      birth_date: newUser.birth_date,
      role: newUser.role,
    };

    return { user, token };
  } catch (error) {
    throw new Error(`Error creating user: ${(error as Error).message}`);
  }
};
