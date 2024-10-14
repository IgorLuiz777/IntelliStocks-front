import axios from "axios";
import toast from 'react-hot-toast';

export async function deleteProduct(id: number) {
    try {
        await axios.delete(`http://localhost:8080/product/${id}`);
        toast.success('Produto excluído com sucesso!');
    } catch (error) {
        toast.error('Erro ao excluir o produto. Tente novamente.');
        console.error('Erro ao excluir o produto:', error);
    }
}
