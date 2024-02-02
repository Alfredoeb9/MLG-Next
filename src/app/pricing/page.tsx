import Link from "next/link";
import React from "react";
import PricingCards from "./PricingCards";

export default function Pricing() {
    return (
        <section>
            Buy Credits!
            <p>Purchase credits to enter into tournaments or cash matches</p>
            <p>Please review our <Link href={"/refund-policy"}>Refund Policy</Link> before buying credits. We do not issue refunds at this time.</p>
            <PricingCards />
        </section>
    )
}