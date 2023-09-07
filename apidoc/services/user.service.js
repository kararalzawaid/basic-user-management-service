import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

import db from '../models';

const create = async data => {
  const User = db.User;

  const validUntil = new Date();
  validUntil.setHours(validUntil.getHours() + 24);

  data.password = bcrypt.hashSync(data.password);
  data.password_recovery_hash = CryptoJS.AES.encrypt(JSON.stringify({ validUntil }), process.env.APP_SECRET).toString();

  return await User.create({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    password: data.password,
    password_recovery_hash: data.password_recovery_hash
  });
};

const update = async (user, data) => {
  user.fullName = data.fullName && data.fullName;
  user.phone = data.phone && data.phone;
  user.password = data.password && bcrypt.hashSync(data.password);

  return await user.save();
};

const changePassword = async (user, data) => {
  user.password = data.password && bcrypt.hashSync(data.password);

  return await user.save();
};

export const userService = {
  create,
  update,
  changePassword
};
