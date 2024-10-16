import axios from "axios";
import toast from "react-hot-toast";

export async function createMovement(movementData: any) {
    const data = {
        product: { id: movementData.product },
        quantity: movementData.quantity,
        typeMovement: movementData.typeMovement,
    };

    try {
        await toast.promise(
            axios.post('http://localhost:8080/stockMovement', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            {
                loading: 'Salvando...',
                success: <b>Movimentação criada com sucesso!</b>,
                error: <b>Erro ao criar a movimentação!</b>,
            }
        );
    } catch (error) {
        console.error('Failed to create a new Movement:', error);
        throw error;
    }
}
