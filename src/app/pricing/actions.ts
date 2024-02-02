"use server";

import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";

export async function checkoutAction(credits: number) {
    const session = await getServerSession();
    if (!session.user.email) {
        throw new Error("You must be logged in to checkout!")
    }

    const priceIds: Record<number, string> = {
        25: process.env.PRICE_ID_25!,
        50: process.env.PRICE_ID_50!,
        100: process.env.PRICE_ID_100!,
        250: process.env.PRICE_ID_250!,
    }

    const priceId = priceIds[credits];

    if (!priceId) {
        throw new Error("invalid price id");
    }

    return stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card", "us_bank_account"],
        metadata: {
            email: session.user.email,
            credits: credits
        },
        line_items: [
            {
                price: priceId,
                quantity: 1,
            }
        ],
        success_url: `${process.env.REACT_APP_BASE_URL}/`,
        cancel_url: `${process.env.REACT_APP_BASE_URL}/pricing`,
    })
}

// At some point when user accepts tournament to take away credits
/*
    const { count } = await db.user.updateManu({
        where: {
            id: session!.user.id,
            credits: {
                // greater than or equal to 1
                gte: <tournamentCost>,
            },
        },
        data: {
            credits: {
                decrement: <tournamentCost>
            }
        }
    })

    if (count <= <tournamentCost>) {
        return makeActionError("You do no have enough credits")
    }
*/