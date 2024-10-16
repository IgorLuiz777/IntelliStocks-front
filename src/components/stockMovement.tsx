
import { Loader2, Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"

import { getMovementById } from "@/app/actions/stocks/getMovementsById";
import { Button } from "./ui/button";
import CreateStockMovement from "./createStockMovement";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

interface MovementProps {
    productId: number;
}
export default function StockMovement({ productId }: MovementProps) {
    const [movements, setMovements] = useState<Movement[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchMovements = async () => {
            try {
                const fetchedMovements = await getMovementById(productId);
                setMovements(fetchedMovements.movements);
            } catch (error) {
                console.error("Erro ao buscar as movimentações:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovements();
    }, [productId]);

    if (loading) {
        return <Loader2 className="animate-spin" />;
    }

    if (!movements || movements.length === 0) {
        return <p>Não foram encontradas movimentações para este produto.</p>;
    }

    const formatDate = (dateArray: number[]) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="max-h-[85vh] overflow-auto">
            <div className="flex my-4">
                <div>
                    <p className="text-xl">{movements[0].product.name}</p>
                    <p><strong>Quantidade atual em Estoque:</strong> {movements[0].product.quantity}</p>
                </div>

                <div className="justify-right align-right m-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="text-sm w-28 h-12 font-bold text-center text-wrap">Adicionar Movimentação</Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Adiconar Movimentação:</DialogTitle>
                            </DialogHeader>

                            <CreateStockMovement />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {movements.map((movement) => (
                <div key={movement.id} className={`${movement.typeMovement === "INPUT" ? "bg-green-100" : "bg-red-100"} flex border rounded-sm border-gray-400 p-4 mb-4`}>
                    <div >
                        <p><strong>Quantidade Movimentada:</strong> {movement.quantity}</p>
                        <p><strong>Data da Movimentação:</strong> {formatDate(movement.dateMovement)}</p>
                        <p><strong>Tipo de Movimentação:</strong> {movement.typeMovement === "INPUT" ? "Entrada" : "Saída"}</p>
                    </div>
                    <div className="m-auto">
                        {movement.typeMovement === "INPUT" ? <Plus /> : <Minus />}
                    </div>
                </div>
            ))}
        </div>
    );


}