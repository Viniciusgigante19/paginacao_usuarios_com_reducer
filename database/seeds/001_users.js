import bcrypt from 'bcrypt';
import UserModel from '../../app/Models/UserModel.js';

export default {
  up: async () => {
    const senha = "123456";
    const hashedPassword = await bcrypt.hash(senha, 10);

    const users = Array.from({ length: 50 }, (_, i) => ({
      name: `User${i + 1}`,
      email: `user${i + 1}@unifaat.com`,
      password: hashedPassword,
      role: i === 0 ? "ADMIN" : "USER",
    }));

    await UserModel.bulkCreate(users);
  },

  down: async () => {
    const emails = Array.from({ length: 50 }, (_, i) => `user${i + 1}@unifaat.com`);

    await UserModel.destroy({
      where: {
        email: emails,
      },
    });
  },
};
