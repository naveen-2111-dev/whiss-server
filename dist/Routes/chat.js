import moment from "moment";
import { getCollection } from "../utils/connect.js";
export async function Chat(req, res) {
    try {
        const { message } = req.body;
        const { roomId, ip } = req.params;
        if (!roomId) {
            return res.status(400).json({ success: false, message: "room id not found" });
        }
        if (!ip) {
            return res.status(400).json({ success: false, message: "IP address not given" });
        }
        const collection = await getCollection("rooms");
        const existingRoom = await collection.findOne({ "room.roomId": roomId });
        if (!existingRoom) {
            return res.status(500).json({ success: false, message: "Room not exists" });
        }
        if (!existingRoom.room.participants.includes(ip)) {
            collection.updateOne({
                "room.roomId": roomId
            }, {
                $push: { "room.participants": ip }
            });
        }
        const chat = {
            sender: ip,
            message: message,
            timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
        };
        const response = await collection.updateOne({
            "room.roomId": roomId
        }, {
            $push: { "room.chat": chat }
        });
        if (!response.acknowledged) {
            return res.status(500).json({ success: false, message: "Failed to update chat" });
        }
        return res.status(201).json({ success: true, message: "Chat updated successfully", roomId: roomId });
    }
    catch (error) {
        console.error("Failed to update chat:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update chat",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}
