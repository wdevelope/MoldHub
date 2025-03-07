import { DB } from '../common/config/postgresql.config';
import { User } from '../models/user.model';
import { HttpError } from '../common/errors/HttpError';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

const userRepository: Repository<User> = DB.getRepository(User);

// * 회원 가입
export const createUser = async (userData: Partial<User>) => {
  const newUser = userRepository.create(userData);

  const password = newUser.password;
  newUser.password = await bcrypt.hash(password, 10);
  newUser.accessLevel = 1;

  await userRepository.save(newUser);
  return { message: 'User created successfully' };
};

// * 로그인
export const login = async (email: string, password: string) => {
  const user = await userRepository.findOne({ where: { email } });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new HttpError(400, 'Email or password is incorrect');
  }

  const token = jwt.sign(
    {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      accessLevel: user.accessLevel,
    },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: '24h' }
  );

  const { password: _, ...userWithoutSensitiveInfo } = user;
  return { token, user: userWithoutSensitiveInfo };
};

// * 내 정보 조회
export const getMyInfo = async (userId: number) => {
  const user = await userRepository.findOne({ where: { id: userId }, select: ['id', 'name', 'email'] });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  return user;
};

// * 내 정보 수정
export const updateMyInfo = async (userId: number, updateData: Partial<User>) => {
  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  await userRepository.update(userId, updateData);
  return await userRepository.findOne({ where: { id: userId } });
};

// * 유저 삭제
export const deleteUser = async (userId: number) => {
  await userRepository.delete(userId);
};
