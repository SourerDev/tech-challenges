import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function verifyPassword(passwordHash: string, password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, passwordHash);
    return match;
}
