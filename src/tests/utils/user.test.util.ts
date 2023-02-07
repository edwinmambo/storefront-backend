import jwt from 'jsonwebtoken';
import { User } from '../../types/index.type';

const getUserToken = (u: User) => {
  const testUser: User = {
    username: u.username,
    password_digest: u.password_digest,
  };
  const token = jwt.sign(testUser, process.env.TOKEN_SECRET as string);
  return token;
};

export default getUserToken;
