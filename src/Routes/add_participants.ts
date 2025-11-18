import { Request, Response } from "express";
import { getCollection } from "../utils/connect.js";

export async function AddParticipants(req: Request, res: Response) {
    try {
        let { roomId, participant } = req.params;
        if (!roomId) {
            return res.status(404).json({ success: false, message: "roomId Not found" });
        }

        if (!participant) {
            return res.status(404).json({ success: false, message: "participant Not found" });
        }

        const collection = await getCollection("rooms");
        const existingRoom = await collection.findOne({ "room.roomId": roomId });
        if (!existingRoom) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        await collection.updateOne(
            { "room.roomId": roomId },
            { $addToSet: { "room.participants": participant } }
        );

        const updatedRoom = await collection.findOne({ "room.roomId": roomId });
        return res.status(200).json({ success: true, room: updatedRoom });
    } catch (error) {
        console.error("Failed to AddParticipants:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to AddParticipants",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}
