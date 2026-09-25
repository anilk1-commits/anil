import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const hash = searchParams.get('hash');

    if (!hash) return NextResponse.json({ verified: false });

    const order = await prisma.order.findFirst({
        where: { hashOutput: hash },
    });

    if (order) {
        return NextResponse.json({ verified: true, name: order.holderName, intention: order.intentionText });
    }

    return NextResponse.json({ verified: false });
}