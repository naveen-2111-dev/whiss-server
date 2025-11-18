import bcrypt from "bcrypt";

export function Hash(secret: string): string | null {
    const hash = bcrypt.hashSync(secret, 10);
    return hash || null;
}
