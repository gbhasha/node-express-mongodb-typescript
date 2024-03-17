import crypto from "crypto";

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (password: string, salt: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.SECRET_KEY)
    .digest("hex");
  //   return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("base64");
};
