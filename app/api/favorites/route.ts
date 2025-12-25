import {NextResponse} from "next/server";
import {verifyToken} from "@/libs/data/utils/token";
import {getContainer} from "@/libs/data/di/container";
import {requireUserToken} from "@/libs/data/utils/auth";

export async function GET() {
    const token = await requireUserToken();
    const {userId} = await verifyToken(token);
    if (!userId) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    const {useCases} = getContainer();
    const items = await useCases.getFavorites.execute(userId);

    return NextResponse.json({items});
}
