import db from "@/lib/db";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

type Metadata = {
    userId: string;
    credits: string;
}

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") ?? "";

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.SRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        return new Response(
            `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
            { status: 400 }
        )
    }

    switch(event.type) {
        case "checkout.session.completed": 
            const completedEvent = event.data.object as Stripe.Checkout.Session & {
                metadata: Metadata;
            };

            const userEmail = completedEvent.metadata.email;
            const credits = completedEvent.metadata.credits;

            await db.user.update({
                where: {
                    email: userEmail,
                },
                data: {
                    credits: {
                        increment: parseInt(credits)
                    }
                }
            });

            break;
        default:
            console.log(`Unhandled event type ${event.type}`)
    }
    return new Response(null, { status: 200 })
}