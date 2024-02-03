"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from "@tanstack/react-query";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import ErrorComponent from "@/components/ErrorComponent";
import Link from "next/link";

export default function Tournaments({
    params: { id },
}: {
    params: {
        id: string;
    }
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [ tournamentId, setTournamentId ] = useState<string>(id);
    const [ error, setError ] = useState<any>(null);

    const { data: tournament, isSuccess, isLoading, isError } = useQuery<any>({
        queryKey: ["tournament-finder"],
        queryFn: () => 
            fetch(`/api/match-finder/${tournamentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tournamentId)
            }).then((res) =>
                res.json()
            ).catch(() => {
                console.log("catch ran up")
            }),
        retry: 3
    })

    const fetchEnroll = async () => {
        try {
            await fetch(`/api/tournament`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tournamentId)
            }).then(async (res) => {

                let data = await res.json()

                if (res.status >= 500) return setError(data?.message)

                if (res.status === 201) {
                    router.push(`/tournaments/enroll?id=${tournamentId}`)
                    return data;
                };

                
            }
                
            ).catch(() => {
                setError(true);
            })
        } catch (error) {
            setError(error)
        }
        
    }

    if ( isLoading ) return <Spinner label="Loading..." color="warning" />

    if ( isError || tournament == undefined || tournament == null || tournament.isError || tournament.message.includes("does not exist")) return <ErrorComponent />

    let d1 = new Date(tournament.data.start_time), 
        d2 = new Date();

    let pstDate = d1.toLocaleString("en-US", {
            timeZone: "America/Los_Angeles"
        })

    return (
        <div className="flex flex-col items-center justify-between">
            <div className="tournament_backgroundHeader">

            </div>
            <main className="container flex justify-center items-center">
                <div id="tournament_info-block">
                    <div className="tournament_image"></div>
                    <div className="tournament_info">
                        <h2>{tournament.data.game}</h2>
                        <p>{tournament.data.tournament_type}</p>

                        <Divider orientation="vertical" />

                        <p>{tournament?.data.platforms.length > 1 ? "Cross Platform" : <p className="text-bold text-small capitalize">{tournament?.data.platforms}</p>}</p>
                    
                        <Card>
                            <CardHeader>
                                <div>
                                    <p>REGISTRATION OPENS</p>
                                    <p>{d2.valueOf() <= d1.valueOf() ? "OPEN NOW" : "CLOSED"}</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <p></p>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div>
                                    <p>Start Time</p>
                                    <p>{pstDate} PST</p>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <p></p>
                            </CardBody>
                        </Card>
                        
                        <div>
                            <div>
                                <p>ENTRY/PLAYER</p>
                                <p>{tournament?.data?.entry}</p>
                            </div>

                            <div>
                                <p>TEAM SIZE</p>
                                <p>{tournament?.data?.team_size}</p>
                            </div>

                            <div>
                                <p>MAX TEAMS</p>
                                <p>{tournament?.data?.max_teams}</p>
                            </div>

                            <div>
                                <p>ENROLLED</p>
                                <p>{tournament?.data?.enrolled}</p>
                            </div>
                        </div>
                    </div>
                    <div className="tournament_info_footer">
                        <Link href={`/tournaments/enroll?id=${tournamentId}`}>Enroll Now</Link>
                        <button>Find Teammates</button>
                    </div>
                </div>

                <div className="tournament_body">
                    <div className="tournament_body_info_bar"></div>
                    <div className="tournament_body_prizes"></div>
                </div>

                <div className="tournament_details_tab_prizes"></div>

                {error && <p className="text-red-400 font-bold">{error}</p>}
            </main>
        </div>
    )
}