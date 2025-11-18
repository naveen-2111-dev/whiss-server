import express, { Request, Response } from 'express'
import path from 'node:path';
import { GetRoom } from './Routes/get_room.js';
import { GetMyRoom } from './Routes/get_my_rooms.js';
import { GetIp } from './Routes/get_ip.js';
import { CreateRoom } from './Routes/create_room.js';
import { Chat } from './Routes/chat.js';
import { AddParticipants } from './Routes/add_participants.js';
import { RemoveParticipants } from './Routes/remove_participants.js';

const app = express()

app.use(express.json());

// home
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// API routes
app.get("/get-room/:roomId", GetRoom);
app.get("/get-my-room", GetMyRoom);
app.get("/get-my-ip", GetIp);

app.post("/create-room", CreateRoom);
app.post("/chat/:roomId/:ip", Chat);
app.post("/add-participants/:roomId/:participant", AddParticipants);
app.post("/remove-participants/:roomId/:participant", RemoveParticipants);

export default app
