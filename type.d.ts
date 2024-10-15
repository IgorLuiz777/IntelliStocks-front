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

interface TypeProduct {
    id: number,
    name: string,
    Product: []
}