"use client";
import { useState } from "react";
import {Button} from '@nextui-org/button'; 


interface MatchListProps {
    data: MatchFinderTableProps[],
}

interface MatchFinderTableProps {
    id: number
    game: string,
    platform: string,
    entry: number,
    time_size: string,
    competition: string,
    support: string,
    starting: string,
    info: MatchFinderInfoProps[]
}

interface MatchFinderInfoProps {
    pc_players: boolean,
    snipers: boolean,
    snaking: boolean,
    allowed_input: string
}

// interface MatchFinderTableProps extends Array<MatchFinderTableProps>{}

export const MatchFinderTable = ({data}: MatchListProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    function openInfo() {
        setOpenModal(!openModal);
        
    }
    
    return (
        <div>
            <div>
                <div className="flex flex-row justify-evenly gap-3">
                    <h4>GAME</h4>
                    <h4>PLATFORM</h4>
                    <h4>ENTRY</h4>
                    <h4>TEAM SIZE</h4>
                    <h4>COMPEITION</h4>
                    <h4>SUPPORT</h4>
                    <h4>STARTING</h4>
                    <h4>INFO</h4>
                </div>
                {data.map(({
                    id, game, platform, entry, time_size, competition, 
                    support, starting, info
                }) => (
                    <div key={id} className="flex flex-row justify-evenly gap-10 relative">
                        <p>{game}</p>
                        <p>{platform}</p>
                        <p>{entry}</p>
                        <p>{time_size}</p>
                        <p>{competition}</p>
                        <p>{support}</p>
                        <p>{starting}</p>
                        <p>{platform}</p>
                        <div>
                            <Button 
                                // onMouseEnter={openInfo}
                                // onMouseLeave={openInfo}
                                // className="w-4 bg-green-300 text-center hover:cursor-pointer px-5 py-2 rounded-2xl"
                            >
                                i
                            </Button>
                        </div>
                        
                        {openModal && 
                            // <div className="absolute z-10 bg-slate-500 border-black right-14 bottom-2">
                                <p>{info[0].allowed_input}</p>
                                
                            // </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}