import Link from "next/link";


export default function Footer(){
    return (
        <footer className="p-8 max-w-7xl w-full">
            <div className="flex flex-row justify-evenly m-auto text-white ">
                <div className="footer-left flex flex-row gap-4 justify-center align-top">
                    <div>
                        <h4>COMPETITIONS</h4>
                        <ul className="flex flex-col">
                            <Link href={"/tournaments"}>Tournaments</Link>
                            <Link href={"/tournaments/"}>Call of Duty</Link>
                        </ul>
                    </div>

                    <div>
                        <h4>SUPPORT</h4>
                        <ul className="flex flex-col">
                            <Link href={"/support/ticket-center"}>Ticket Center</Link>
                            <Link href={"/support/faq"}>FAQ</Link>
                        </ul>
                    </div>

                    <div>
                        <h4>CONTACT</h4>
                        <ul className="flex flex-col">
                            <Link href={"/Advertisements"}>Advertisements</Link>
                        </ul>
                    </div>
                </div>


                <div className="footer-right flex flex-row align-top">
                    <div>
                        <h4>FOLLOW US</h4>
                        <ul className="flex gap-2">
                            <Link href={"/Advertisements"}>Twitter</Link>
                            <Link href={"/Advertisements"}>Instagram</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}