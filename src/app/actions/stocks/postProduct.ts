import axios from "axios";

export async function createProduct(productData: any) {
    const data = {
        name: productData.name,
        typeProduct: { id: productData.typeProductId },
        price: parseFloat(productData.price),
        desc: productData.description,
        model: productData.model,
        brand: productData.brand,
        quantity: parseInt(productData.quantity),
    };

    try {
        await axios.post('http://localhost:8080/product', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Failed to create a new Product:', error);
        throw error;
    }
}
