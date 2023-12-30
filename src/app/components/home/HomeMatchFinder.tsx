
import { Users } from "@/lib/Users"
import {MatchFinderTable} from "./MatchFinderTable"

export default function HomeMatchFinder() {
    return (
        <section className="flex flex-col items-center justify-center m-auto">
            <div className="flex flex-row justify-center m-auto">
                <div className="bg-red-400 h-10 w-2 mr-4" />

                <div className="text-white">
                    <h2>MatchFinder</h2>
                    <p>Head to head matches where you pick the game, rules and prize.</p>

                    <MatchFinderTable data={Users} />
                </div>
                
            </div>
        </section>
    )
}