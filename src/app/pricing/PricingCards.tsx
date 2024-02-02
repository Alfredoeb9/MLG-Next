"use client";

import { Button } from "@nextui-org/react";
import React from "react";
import { checkoutAction } from "./actions";
import getStripe from "utils/get-stripejs";
import { pricingCards } from "@/lib/PricingCards";
import Image from "next/image";

export default function PricingCards() {

    return (
        <div>
            <div className="flex flex-row items-center justify-between">
                {pricingCards.map((card: any) => (
                    <div className="">
                        <Image src={"/images/mw3.png"} width={60} height={60} alt={""} />
                        <p>{card.credits} Credits</p>

                        <Button
                            onClick={() => {
                                checkoutAction(card.credits).then(async (session) => {
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
                        >
                            Buy for ${card.cost}
                        </Button>
                    </div>
                ))}
            </div>

            
        </div>
    )
}