import { randomBytes, pbkdf2Sync } from 'node:crypto';

export const hashPassword = (password) => {
    const salt = randomBytes(16).toString('hex');
    const iterations = 100000;
    const keyLength = 64;
    const digest = 'sha512';
    const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
    const process = `${iterations}:${salt}:${hash}`;
    return process;
};

export const comparePassword = (inputPassword, storedProcess) => {
    const [iterations, salt, storedHash] = storedProcess.split(':');
    const keyLength = 64;
    const digest = 'sha512';

    const inputHash = pbkdf2Sync(
        inputPassword,
        salt,
        parseInt(iterations),
        keyLength,
        digest
    ).toString('hex');

    return inputHash === storedHash;
};