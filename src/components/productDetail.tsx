import { useEffect, useState } from 'react';
import { getProductById } from "@/app/actions/stocks/getProductById";
import { Loader2 } from "lucide-react";

interface ProductDetailsProps {
  productId: number;
}

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <Loader2 className="animate-spin" />;
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div>
      <p><strong>Nome:</strong> {product.name}</p>
      <p><strong>Preço:</strong> {product.price}</p>
      <p><strong>Descrição:</strong> {product.desc}</p>
      <p><strong>Categoria:</strong> {product.typeProductName}</p>
      <p><strong>Modelo:</strong> {product.model}</p>
      <p><strong>Marca:</strong> {product.brand}</p>
      <p><strong>Quantidade:</strong> {product.quantity}</p>
    </div>
  );
}
