import Image from "next/image";
import { Separator } from "./ui/separator";
import { Mail, Phone, Youtube } from "lucide-react";

export default function Footer() {

    return(
    <footer className="bg-gray-100 text-gray-600 p-4 text-center border-t border-gray-200">

        <div>
            <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">Entre em contato:</h4>
                <p className="text-sm text-muted-foreground">
                    Chame o suporte técnico para tirar duvidas!
                </p>
            </div>
            <Separator className="my-4" />
            <div className="flex mb-4 h-5 items-center space-x-4 text-sm align-center justify-center">
                <a href="#"><Mail className="text-cyan-400"/></a>
                <Separator orientation="vertical" />
                <a href="# "><Phone className="text-cyan-400"/></a>
                <Separator orientation="vertical" />
                <a href="#"><Youtube className="text-cyan-400" size={26}/></a>
            </div>
        </div>

        <p>&copy; 2024 IntelliStocks. Todos os direitos reservados.</p>
        <p className="mt-2 text-sm">Impulsionando o futuro dos negócios com gestão inteligente</p>
    </footer>
    )

}