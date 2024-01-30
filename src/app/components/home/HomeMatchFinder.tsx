
import { Users } from "@/lib/Users"
import {MatchFinderTable} from "./MatchFinderTable"
import { useQuery } from "@tanstack/react-query"

export default function HomeMatchFinder() {
    const { data: matches, isLoading, isError, isSuccess} = useQuery<any>({
        queryKey: ["match-finder"],
        queryFn: () => 
            fetch('/api/match-finder').then((res) =>
                res.json()
            ),
        retry: 3
    })

    console.log("query", matches)
    console.log("isSuccess", isSuccess)
    console.log("query", matches)
    return (
        <section className="flex flex-col items-center justify-center m-auto py-8">
            <div className="flex flex-row justify-center m-auto">
                <div className="bg-red-400 h-10 w-2 mr-4" />

                <div className="text-white">
                    <h2 className="text-4xl">MatchFinder</h2>
                    <p className="text-xl mb-2">Head to head matches where you pick the game, rules and prize.</p>

                    { isSuccess && <MatchFinderTable data={matches} />}
                    
                </div>
                
            </div>
        </section>
    )
}