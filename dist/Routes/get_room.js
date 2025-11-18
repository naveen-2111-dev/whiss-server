import { getCollection } from "../utils/connect.js";
export async function GetRoom(req, res) {
    try {
        let { roomId } = req.params;
        if (!roomId) {
            return res.status(404).json({ success: false, message: "roomId Not found" });
        }
        const collection = await getCollection("rooms");
        const existingRoom = await collection.findOne({ "room.roomId": roomId });
        if (!existingRoom) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }
        return res.status(200).json({ success: true, room: existingRoom });
    }
    catch (error) {
        console.error("Failed to get room:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get room",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}
