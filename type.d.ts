interface Product {
    id: number,
    name: string,
    typeProductName: string,
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