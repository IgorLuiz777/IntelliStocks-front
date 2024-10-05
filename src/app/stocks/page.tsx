"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Package } from "lucide-react"

const produtosData = [
  { id: 1, nome: "Camiseta Básica", categoria: "Vestuário", preco: 29.99, estoque: 100 },
  { id: 2, nome: "Smartphone XYZ", categoria: "Eletrônicos", preco: 999.99, estoque: 50 },
  { id: 3, nome: "Livro: Aventuras Incríveis", categoria: "Livros", preco: 19.99, estoque: 200 },
  { id: 4, nome: "Tênis Esportivo", categoria: "Calçados", preco: 89.99, estoque: 75 },
  { id: 5, nome: "Cafeteira Elétrica", categoria: "Eletrodomésticos", preco: 59.99, estoque: 30 },
  { id: 6, nome: "Mochila Escolar", categoria: "Acessórios", preco: 39.99, estoque: 150 },
  { id: 7, nome: "Monitor 24\"", categoria: "Eletrônicos", preco: 199.99, estoque: 40 },
  { id: 8, nome: "Cadeira de Escritório", categoria: "Móveis", preco: 149.99, estoque: 25 },
  { id: 9, nome: "Fone de Ouvido Bluetooth", categoria: "Eletrônicos", preco: 79.99, estoque: 80 },
  { id: 10, nome: "Panela Elétrica", categoria: "Utensílios Domésticos", preco: 69.99, estoque: 60 },
]

export default function Stocks() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredProdutos = produtosData.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage)

  const currentProdutos = filteredProdutos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Package className="mr-2" />
            Produtos e Estoques
          </CardTitle>
        </CardHeader>
        <CardContent>
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
            <Button>Adicionar Produto</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-center">Estoque</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProdutos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell className="font-medium">{produto.nome}</TableCell>
                  <TableCell>{produto.categoria}</TableCell>
                  <TableCell className="text-right">
                    {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">
                      {produto.estoque}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  )
}