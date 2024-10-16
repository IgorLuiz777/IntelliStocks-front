import { createMovement } from "@/app/actions/movement/createMovement";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Movement {
    product: string;
    quantity: number;
    typeMovement: string;
}

export default function CreateStockMovement() {
    const [movementData, setMovementData] = useState<Movement>({
        product: '',
        quantity: 0,
        typeMovement: ''
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createMovement(movementData);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    return (
        <div className="sm:max-w-[425px]">
            <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product" className="text-right">Produto</Label>
                    <Input
                        id="product"
                        value={movementData.product}
                        onChange={(e) => setMovementData({ ...movementData, product: e.target.value })}
                        placeholder="ID do Produto"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">Quantidade</Label>
                    <Input
                        id="quantity"
                        type="number"
                        value={movementData.quantity}
                        onChange={(e) => setMovementData({ ...movementData, quantity: Number(e.target.value) })}
                        placeholder="Quantidade"
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="typeMovement" className="text-right">Tipo de Movimentação</Label>
                    <Input
                        id="typeMovement"
                        value={movementData.typeMovement}
                        onChange={(e) => setMovementData({ ...movementData, typeMovement: e.target.value })}
                        placeholder="ENTRADA ou SAÍDA"
                        className="col-span-3"
                    />
                </div>
                <div>
                    <Button type="submit" className="btn">Criar Movimentação</Button>
                </div>
            </form>
        </div>
    );
}
