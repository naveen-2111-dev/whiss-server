import { getLocalIP } from "../utils/getIp.js";
import { getCollection } from "../utils/connect.js";
export async function GetMyRoom(req, res) {
    try {
        const ip = getLocalIP();
        const collection = await getCollection("rooms");
        const myRoom = await collection.findOne({ "room.hostIp": ip });
        if (!myRoom) {
            return res.status(404).json({ success: false, message: "No room found for this host IP" });
        }
        return res.status(200).json({ success: true, room: myRoom });
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
