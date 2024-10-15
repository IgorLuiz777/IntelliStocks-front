import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { CheckIcon, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

import { getProductById } from "@/app/actions/stocks/getProductById"
import { putProduct } from "@/app/actions/stocks/putProduct"
import { getAllTypeProducts } from "@/app/actions/stocks/getAllTypeProducts"
import toast from "react-hot-toast"

interface ProductEditProps {
    productId: number;
}

interface FormState {
    name: string;
    typeProductId: number;
    price: string;
    description: string;
    model: string;
    brand: string;
    quantity: string;
}

export function ProductEdit({ productId }: ProductEditProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [typeProducts, setTypeProducts] = useState<TypeProduct[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState<FormState>({
        name: '',
        typeProductId: 0,
        price: '',
        description: '',
        model: '',
        brand: '',
        quantity: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO: ARRUMAR TOAST DUPLICADO

        try {
            await toast.promise(
                putProduct(state, productId),
                {
                    loading: 'Salvando...',
                    success: <b>Produto Editado com sucesso!</b>,
                    error: <b>Erro ao editar o produto!</b>,
                }
            );

            setState({
                name: '',
                typeProductId: 0,
                price: '',
                description: '',
                model: '',
                brand: '',
                quantity: '',
            });
            setOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProductById(productId);
                setProduct(fetchedProduct);

                setState({
                    name: fetchedProduct.name,
                    typeProductId: fetchedProduct.typeProductId,
                    price: fetchedProduct.price.toString(),
                    description: fetchedProduct.desc,
                    model: fetchedProduct.model,
                    brand: fetchedProduct.brand,
                    quantity: fetchedProduct.quantity.toString(),
                });

            } catch (error) {
                console.error("Erro ao buscar o produto:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchTypeProducts = async () => {
            setLoading(true);
            try {
                const typeProductsData: TypeProduct[] = await getAllTypeProducts();
                setTypeProducts(typeProductsData);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
        fetchTypeProducts();
    }, [productId]);

    if (loading) {
        return <Loader2 className="animate-spin" />;
    }

    if (!product) {
        return <p>Produto não encontrado.</p>;
    }

    return (
        <div>
            <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Nome</Label>
                    <Input
                        id="name"
                        value={state.name}
                        onChange={(e) => setState({ ...state, name: e.target.value })}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="typeProduct" className="text-right">Categoria</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="col-span-3 justify-between"
                            >
                                {state.typeProductId
                                    ? typeProducts.find((typeProduct) => typeProduct.id === state.typeProductId)?.name
                                    : "Selecione uma categoria..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="col-span-3 p-0">
                            <Command>
                                <CommandInput placeholder="Pesquise a categoria..." className="h-9" />
                                <CommandList>
                                    <CommandEmpty>Categoria não encontrada!</CommandEmpty>
                                    <CommandGroup>
                                        {typeProducts.map((typeProduct) => (
                                            <CommandItem
                                                key={typeProduct.id}
                                                value={typeProduct.name}
                                                onSelect={() => {
                                                    setState({ ...state, typeProductId: typeProduct.id });
                                                    setOpen(false);
                                                }}
                                            >
                                                {typeProduct.name}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        state.typeProductId === typeProduct.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>

                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">Preço</Label>
                    <Input
                        id="price"
                        type="number"
                        value={state.price}
                        onChange={(e) => setState({ ...state, price: e.target.value })}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Descrição</Label>
                    <Input
                        id="description"
                        value={state.description}
                        onChange={(e) => setState({ ...state, description: e.target.value })}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="model" className="text-right">Modelo</Label>
                    <Input
                        id="model"
                        value={state.model}
                        onChange={(e) => setState({ ...state, model: e.target.value })}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="brand" className="text-right">Marca</Label>
                    <Input
                        id="brand"
                        value={state.brand}
                        onChange={(e) => setState({ ...state, brand: e.target.value })}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">Quantidade</Label>
                    <Input
                        id="quantity"
                        type="number"
                        value={state.quantity}
                        onChange={(e) => setState({ ...state, quantity: e.target.value })}
                        className="col-span-3"
                    />
                </div>
                <DialogFooter>
                    <Button type="submit">Salvar Alterações</Button>
                </DialogFooter>
            </form>
        </div>
    );
}
