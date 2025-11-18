import bcrypt from "bcrypt";
export function Hash(secret) {
    const hash = bcrypt.hashSync(secret, 10);
    return hash || null;
}
