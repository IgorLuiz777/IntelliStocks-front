import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {

    return (
        <header className="p-4 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image src="/assets/intellistocks_logo(1).webp" alt="IntelliStocks Logo" 
                    width={100} height={100} />
                </div>
                <nav>
                    <Link href="/"><Button variant="ghost">Home</Button></Link>
                    <Button variant="ghost">Contato</Button>
                    <Link href="/forms/signin"><Button variant="outline" className="ml-2">Entrar</Button></Link>
                </nav>
            </div>
        </header>
    )

}