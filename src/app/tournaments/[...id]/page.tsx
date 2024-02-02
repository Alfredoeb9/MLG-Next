"use client";
import React, { useState } from "react";
import { usePathname } from 'next/navigation'
import { useQuery } from "@tanstack/react-query"

export default function Tournaments() {
    const pathname = usePathname()
    const [tournamentId, setTournamentId] = useState<string>(pathname.split('/')[2]);

    const data = useQuery<any>({
        queryKey: ["tournament-finder"],
        queryFn: () => 
            fetch(`/api/match-finder/${tournamentId}`).then((res) =>
                res.json()
            ),
        retry: 3
    })

    console.log("query", data)

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            from Tournaments id
        </div>
    )
}