import { nanoid } from "nanoid";
import moment from "moment";
import { getLocalIP } from "../utils/getIp.js";
import { getCollection } from "../utils/connect.js";
export async function CreateRoom(req, res) {
    try {
        let { roomId } = req.body;
        if (!roomId) {
            roomId = nanoid(10);
        }
        const ip = getLocalIP();
        if (!ip) {
            return res.status(400).json({ success: false, message: "IP address not found" });
        }
        const collection = await getCollection("rooms");
        const existingRoom = await collection.findOne({ "room.roomId": roomId });
        if (existingRoom) {
            return res.status(500).json({ success: false, message: "Room ID already exists" });
        }
        const newRoom = {
            room: {
                roomId: roomId,
                hostIp: ip,
                participants: [],
                chat: []
            },
            createdAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };
        const response = await collection.insertOne(newRoom);
        if (!response.acknowledged) {
            return res.status(500).json({ success: false, message: "Failed to create room" });
        }
        return res.status(201).json({ success: true, message: "Room created successfully", roomId: roomId });
    }
    catch (error) {
        console.error("Failed to create room:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create room",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}
