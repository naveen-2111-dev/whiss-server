import { Request, Response } from "express";
import { getLocalIP } from "../utils/getIp.js";

export async function GetIp(req: Request, res: Response) {
    try {
        const ip = getLocalIP();
        return res.status(200).json({
            success: true,
            message: "Got IP successfully",
            ip: ip
        });
    } catch (error) {
        console.error("Failed to get ip:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get ip",
            error: error instanceof Error ? error.message : String(error)
        });
    }
}
