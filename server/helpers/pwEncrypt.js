import bcrypt from "bcrypt";

const pwEncrypt = async (pw) => {
  return await bcrypt.hash(pw, 10);
};

export default pwEncrypt;
