import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {

    return (
        <header className="p-4 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image src="/assets/intellistocks_logo(1).webp" alt="IntelliStocks Logo" 
                    width={100} height={100} />
                </div>
                <nav>
                    <Button variant="ghost">Home</Button>
                    <Button variant="ghost">Contato</Button>
                    <Button variant="outline" className="ml-2">Estoques</Button>
                    <Button variant="outline" className="ml-2">Gestão</Button>
                </nav>
            </div>
        </header>
    )

}