import {NextResponse} from "next/server";
import {verifyToken} from "@/libs/data/utils/token";
import {getContainer} from "@/libs/data/di/container";

export async function GET(req: Request) {
    const authHeader = req.headers.get('Authentication') ?? req.headers.get('Authorization');
    if (!authHeader) return null;

    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = bearerMatch ? bearerMatch[1] : authHeader;
    const {userId} = await verifyToken(token);
    if (!userId) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const {useCases} = getContainer();
    const items = await useCases.getFavorites.execute(userId);

    return NextResponse.json({items});
}
