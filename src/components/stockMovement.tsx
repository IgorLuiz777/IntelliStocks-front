
import { Loader2, Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"

import { getMovementById } from "@/app/actions/stocks/getMovementsById";

interface MovementProps {
    productId: number;
}
export default function StockMovement({ productId }: MovementProps) {
    const [movements, setMovements] = useState<Movement[] | null>(null);
    const [loading, setLoading] = useState(true);

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
            <div className="my-4">
                <p className="text-xl">{movements[0].product.name}</p>
                <p><strong>Quantidade atual em Estoque:</strong> {movements[0].product.quantity}</p>
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