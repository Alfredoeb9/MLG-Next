import { useRouter } from "next/navigation";


export default function LoginBanner() {
    const router = useRouter()
    return (
        <section className="flex flex-row justify-center items-center py-8 bg-slate-900">
            <p className="text-white">JOIN THE FASTEST GROWING ESPORTS COMMUNITY</p>
            <button 
                className="text-white border-slate-500 bg-slate-500 rounded-sm py-2 px-5 ml-2 hover:scale-105 transition-all"
                onClick={() => {
                    router.push("/auth/sign-up")
                }}
            >
                Join Now
            </button>
        </section>
    )
}