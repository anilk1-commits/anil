import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, intention, hashOutput } = body;

        const apiKey = process.env.LEMONSQUEEZY_API_KEY;
        const storeId = process.env.LEMONSQUEEZY_STORE_ID;
        const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.uniquemanifestation.com";

        if (!apiKey || !storeId || !variantId) {
            return NextResponse.json({ error: "Environment variables missing" }, { status: 500 });
        }

        const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
            method: "POST",
            headers: {
                Accept: "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                data: {
                    type: "checkouts",
                    attributes: {
                        checkout_data: {
                            custom: {
                                user_name: name,
                                user_intention: intention,
                            },
                        },
                        product_options: {
                            redirect_url: `${appUrl}/?success=true&hash=${hashOutput || ''}`,
                        },
                    },
                    relationships: {
                        store: { data: { type: "stores", id: storeId } },
                        variant: { data: { type: "variants", id: variantId } },
                    },
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: data }, { status: response.status });
        }

        return NextResponse.json({ url: data.data.attributes.url });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}