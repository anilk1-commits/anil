import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const text = await request.text();
        const hmac = crypto.createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET!);
        const digest = hmac.update(text).digest('hex');
        const signature = request.headers.get('x-signature');

        if (signature !== digest) {
            return NextResponse.json({ error: 'Geçersiz imza' }, { status: 400 });
        }

        const event = JSON.parse(text);
        if (event.meta.event_name === 'order_created') {
            const customData = event.meta.custom_data;
            const attributes = event.data.attributes;

            await prisma.order.create({
                data: {
                    orderId: event.data.id,
                    customerEmail: attributes.user_email,
                    holderName: customData.holder_name,
                    intentionText: customData.intention_text,
                    hashOutput: customData.hash_signature,
                },
            });
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}