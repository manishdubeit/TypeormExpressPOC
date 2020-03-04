const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateHash = async (password: string, saltRounds: number): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds,  (err: any, hash: string) => {
      if (!err) {
        resolve(hash);
      }
      reject(err);
    });
  });

const verifyHash = async (password: string, hash: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash,  (err: any, result: string) => {
      if (result) {
        resolve(true);
      }
      resolve(false);
    });
  });

export {
  generateHash,
  verifyHash,
};
