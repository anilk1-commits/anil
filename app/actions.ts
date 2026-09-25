'use server';

export async function createCheckoutSession(formData: { name: string; intention: string; hashOutput: string }) {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY || process.env.NEXT_PUBLIC_LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID || process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID;
    const variantId = process.env.LEMONSQUEEZY_VARIANT_ID || process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.uniquemanifestation.com";

    if (!apiKey || !storeId || !variantId) {
        throw new Error("Lemon Squeezy ortam değişkenleri eksik!");
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
                            user_name: formData.name,
                            user_intention: formData.intention,
                        },
                    },
                    product_options: {
                        redirect_url: `${appUrl}/?success=true&hash=${formData.hashOutput || ''}`,
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
        console.error("Lemon Squeezy API Hatası:", data);
        throw new Error(JSON.stringify(data));
    }

    return data.data.attributes.url;
}