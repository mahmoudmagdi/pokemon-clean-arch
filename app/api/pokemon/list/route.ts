import {NextRequest, NextResponse} from "next/server";
import {getContainer} from "@/libs/data/di/container";
import {z} from "zod";

const QuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).default(30),
    offset: z.coerce.number().int().min(0).default(0)
});

export async function GET(req: NextRequest): Promise<NextResponse> {
    const url = new URL(req.url);
    const parsed = QuerySchema.safeParse({
        limit: url.searchParams.get("limit"),
        offset: url.searchParams.get("offset")
    });
    if (!parsed.success) {
        return NextResponse.json({error: "Invalid query"}, {status: 400});
    }

    const {limit, offset} = parsed.data;

    const {useCases} = getContainer();
    const useCase = await useCases.listPokemon.execute(limit, offset);

    const items = useCase.items;
    const nextOffset = useCase.nextOffset;

    return NextResponse.json({
        items: items,
        nextOffset: Number.isFinite(nextOffset) ? nextOffset : null
    });
}
