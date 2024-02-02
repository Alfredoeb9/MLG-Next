"use client";

import { Button } from "@nextui-org/react";
import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { checkoutAction } from "./actions";
import getStripe from "utils/get-stripejs";
import { pricingCards } from "@/lib/PricingCards";
import Image from "next/image";

export default function PricingCards() {

    return (
        <div>
            <div className="gap-5 grid grid-cols-2 sm:grid-cols-4">
                {pricingCards.map((card: any) => (
                    <Card key={card.id} isPressable onPress={() => {
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
                    }}>
                        <CardBody className="flex justify-center items-center">
                            <Image src={"/images/mw3.png"} width={170} height={170} alt={""} />
                            
                            
                        </CardBody>
                        

                        <CardFooter className="flex justify-center items-center">
                                <p className="mr-2">{card.credits} Credits</p>

                                <span className="bg-slate-400 px-3 py-4 rounded-md text-white hover:scale-105 shadow-xl">
                                    Buy for ${card.cost}
                                </span>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            
        </div>
    )
}