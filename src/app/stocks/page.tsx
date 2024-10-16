"use client"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { CheckIcon, Loader2, Package, PackagePlus, PackageSearch, Pencil, Search, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { getAllProducts } from "../actions/stocks/getAllProducts"
import { getAllTypeProducts } from "../actions/stocks/getAllTypeProducts"
import { createProduct } from "../actions/stocks/postProduct"
import { ProductDetails } from "@/components/productDetail"
import { deleteProduct } from "../actions/stocks/delete"
import { Toaster } from 'react-hot-toast';
import { ProductEdit } from "@/components/productEdit"
import StockMovement from "@/components/stockMovement"

interface FormState {
    name: string;
    typeProductId: number;
    price: string;
    description: string;
    model: string;
    brand: string;
    quantity: string;
}

export default function Stocks() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [open, setOpen] = useState(false);
    const [typeProducts, setTypeProducts] = useState<TypeProduct[]>([]);
    const [state, setState] = useState<FormState>({
        name: '',
        typeProductId: 0,
        price: '',
        description: '',
        model: '',
        brand: '',
        quantity: '',
    });
    const [loading, setLoading] = useState(Boolean)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await createProduct(state);
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

    const handleDeleteProduct = async (productId: number) => {
        try {
            await deleteProduct(productId);
            setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productsData: Product[] = await getAllProducts();
                setProducts(productsData);
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        const fetchTypeProducts = async () => {
            setLoading(true);
            try {
                const typeProductsData: TypeProduct[] = await getAllTypeProducts();
                setTypeProducts(typeProductsData);
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
        fetchTypeProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
        );
    }

    const filteredProdutos = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.typeProductName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage);

    const currentProdutos = filteredProdutos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-100 text-gray-900">
            <Header />
            <Card className="container p-4 m-auto justify-center items-center my-10">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center text-blue-600">
                        <Package className="mr-2" />
                        Produtos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Toaster position="top-center" reverseOrder={false} />
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Pesquisar produtos..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="pl-8"
                            />
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Adicionar Produto</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Adicionar Produto</DialogTitle>
                                    <DialogDescription>
                                        Credenciais para adição de um novo
                                    </DialogDescription>
                                </DialogHeader>
                                <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">Nome</Label>
                                        <Input
                                            id="name"
                                            value={state.name}
                                            onChange={(e) => setState({ ...state, name: e.target.value })}
                                            placeholder="Digite o nome do produto"
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
                                            placeholder="Digite o preço do produto"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">Descrição</Label>
                                        <Input
                                            id="description"
                                            value={state.description}
                                            onChange={(e) => setState({ ...state, description: e.target.value })}
                                            placeholder="Digite a descrição do produto"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="model" className="text-right">Modelo</Label>
                                        <Input
                                            id="model"
                                            value={state.model}
                                            onChange={(e) => setState({ ...state, model: e.target.value })}
                                            placeholder="Digite o modelo do produto"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="brand" className="text-right">Marca</Label>
                                        <Input
                                            id="brand"
                                            value={state.brand}
                                            onChange={(e) => setState({ ...state, brand: e.target.value })}
                                            placeholder="Digite a marca do produto"
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
                                            placeholder="Digite a quantidade do produto"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Criar Produto</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead className="text-right">Preço</TableHead>
                                <TableHead className="text-center">Quantidade</TableHead>
                                <TableHead className="text-center">Detalhe</TableHead>
                                <TableHead className="text-center">Movimentação</TableHead>
                                <TableHead className="text-center">Editar</TableHead>
                                <TableHead className="text-center">Excluir</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentProdutos.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.typeProductName}</TableCell>
                                    <TableCell className="text-right">
                                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline" className="text-sm">
                                            {product.quantity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant='outline' size='icon'>
                                                    <PackageSearch />
                                                </Button>
                                            </DialogTrigger>

                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Detalhes do Produto</DialogTitle>
                                                </DialogHeader>

                                                <ProductDetails productId={product.id} />
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant='default' size='icon' >
                                                    <PackagePlus />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Movimentações</DialogTitle>
                                                </DialogHeader>

                                                <StockMovement productId={product.id} />

                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size='icon' className="bg-amber-400 hover:bg-amber-300">
                                                    <Pencil />
                                                </Button>
                                            </DialogTrigger>

                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Editar Produto:</DialogTitle>
                                                </DialogHeader>

                                                <ProductEdit productId={product.id} />
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button variant="destructive" size="icon"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            <Trash className="w-4 h-4" strokeWidth={3} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination className="mt-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    className="cursor-pointer"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        className="cursor-pointer"
                                        onClick={() => handlePageChange(index + 1)}
                                        isActive={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    className="cursor-pointer"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardContent>
            </Card>
            <Footer />
        </div>
    );
}