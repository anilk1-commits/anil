import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body: any = await request.json();
        const { name, intention, hashOutput } = body;

        if (!name || !intention || !hashOutput) {
            return NextResponse.json({ success: false, error: 'Eksik veri.' }, { status: 400 });
        }

        const seal: any = await prisma.seal.upsert({
            where: { hashOutput },
            update: { name, intention },
            create: { name, intention, hashOutput },
        });

        return NextResponse.json({ success: true, seal });
    } catch (error) {
        console.error('Save Seal Error:', error);
        const errorMessage: string = error instanceof Error ? error.message : 'Bilinmeyen hata';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}