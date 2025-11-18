interface Chat {
    sender: string;
    message: string;
    timestamp: number;
}

interface Room {
    roomId: string;
    hostIp: string;
    participants: string[];
    chat: Chat[];
    createdAt: number;
}

export { Chat, Room };