"use client";

import { Button } from "@nextui-org/react";
import React from "react";
import { checkoutAction } from "./actions";
import getStripe from "utils/get-stripejs";

export default function PricingCards() {
    return (
        <div>
            this is the cards

            <Button
                onClick={() => {
                    checkoutAction(10).then(async (session) => {
                        const stripe = await getStripe();
                        if (stripe === null) return;
                        await stripe!.redirectToCheckout({
                            sessionId: session.id,
                        });
                    }).catch(() => {
                        console.log("log in hawmie")
                        // toast({
                        //     variat: "destructive",
                        //     title: "Something went wrong",
                        //     descripition: "You much be loggin in to buy credits"
                        // })
                    })
                }}
            >Purchase</Button>
        </div>
    )
}