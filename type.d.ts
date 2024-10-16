interface Product {
    id: number,
    name: string,
    typeProductName: string,
    typeProductId: number,
    price: number,
    desc: string,
    model: string,
    brand: string,
    quantity: number
}
interface Movement {
    id: number;
    product: Product;
    quantity: number;
    dateMovement: number[];
    typeMovement: string;
}

interface TypeProduct {
    id: number,
    name: string,
    Product: []
}