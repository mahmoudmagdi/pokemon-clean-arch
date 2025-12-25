import {NextResponse} from "next/server";
import {requireUserToken} from "@/libs/data/utils/auth";
import {verifyToken} from "@/libs/data/utils/token";
import {getContainer} from "@/libs/data/di/container";

export async function GET() {
    const token = await requireUserToken();
    if (!token) {
        return NextResponse.json(
            {isLoggedIn: false, user: null},
            {status: 200}
        );
    }

    try {
        const payload = await verifyToken(token);
        if (!payload?.userId) {
            return NextResponse.json(
                {isLoggedIn: false, user: null},
                {status: 200}
            );
        }

        const {useCases} = getContainer();
        const user = await useCases.findById.execute(payload.userId);

        if (!user) {
            return NextResponse.json(
                {isLoggedIn: false, user: null},
                {status: 200}
            );
        }

        return NextResponse.json(
            {
                isLoggedIn: true,
                user: {id: user.id, email: user.email, createdAt: user.createdAt},
            },
            {status: 200}
        );
    } catch {
        return NextResponse.json(
            {isLoggedIn: false, user: null},
            {status: 200}
        );
    }
}
