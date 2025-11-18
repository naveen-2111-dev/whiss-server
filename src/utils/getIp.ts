import os from 'node:os';

export function getLocalIP(): string | null {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
        if (iface) {
            for (const addr of iface) {
                if (addr.family === 'IPv4' && !addr.internal) {
                    return addr.address;
                }
            }
        }
    }
    return null;
}
