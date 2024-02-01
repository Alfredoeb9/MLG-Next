import Link from "next/link";
import React from "react";

interface HomeDataProps {
    data: any,
}

export default function HomeFeaturedGames({ data }: HomeDataProps) {

    if (!data) return (
        <h2>Please refresh and try again!</h2>
    )

    return (
        <section className='flex flex-col items-center justify-center m-auto bg-black py-8'>
            <div className='flex flex-row justify-center m-auto'>
                
                <div className="bg-red-400 h-10 w-2 mr-4" />
                
                <div>
                    <h2 className='text-xl text-white'>GAMES</h2>
                    <p className='text-white mb-2'>Select a game and then choose how you want to play.</p>
                    <div className='flex flex-row  gap-3'>
                        {data.games.slice(0,4).map((set: any, i: number) => (
                            <Link href={"/cross-platform/tournaments"} key={set.id} className="flex items-center border-2 border-slate-500 h-20 text-white">
                                {set.game}
                            </Link>
                        ))}
                        <Link href={"/tournaments"} className="flex items-center border-2 border-slate-500 h-20 text-white">
                            SEE ALL GAMES
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}