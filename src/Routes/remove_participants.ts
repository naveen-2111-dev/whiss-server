import { Request, Response } from "express";
import { getCollection } from "../utils/connect.js";

export async function RemoveParticipants(req: Request, res: Response) {
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
            { $pull: { "room.participants": participant } as any }
        );

        const updatedRoom = await collection.findOne({ "room.roomId": roomId });

        if (updatedRoom?.room.participants.length === 0) {
            await collection.updateOne(
                { "room.roomId": roomId },
                { $unset: { "room.chat": [] } }
            );
        }

        return res.status(200).json({
            success: true,
            room: updatedRoom
        });

    } catch (error) {
        console.error("Failed to RemoveParticipants:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to RemoveParticipants",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}
