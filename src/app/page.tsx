import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Package, Kanban, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src="/assets/intellistocks_logo(1).png" alt="IntelliStocks Logo" width={100} height={100} />
          </div>
          <nav>
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">Contato</Button>
            <Button variant="outline" className="ml-2">Estoques</Button>
            <Button variant="outline" className="ml-2">Gestão</Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Bem-vindo ao IntelliStocks
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Sistema de Gerenciamento Inteligente para sua Empresa
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white border-blue-200 border-2 hover:border-blue-400 transition-colors duration-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600 flex items-center">
                <Package className="mr-2" /> Gerenciamento de Estoques
              </CardTitle>
              <CardDescription className="text-gray-600">
                Controle inteligente de produtos e fornecedores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-48 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Package className="w-24 h-24 text-blue-600" />
              </div>
              <p className="text-center mb-6 text-gray-700">
              Acesse nosso sistema de gerenciamento de estoques de última geração, agora com IA integrada para previsão de demandas. 
              Otimize seu inventário automaticamente, com email personalizado e automatico
              garante que seu estoque estará sempre abastecido.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="w-full max-w-xs font-bold text-white">
                Acessar Estoques <ArrowRight className="ml-2" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white border-blue-200 border-2 hover:border-blue-400 transition-colors duration-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600 flex items-center">
                <Kanban className="mr-2" /> Gestão Inteligente
              </CardTitle>
              <CardDescription className="text-gray-600">
                Revolucione sua organização e planejamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-48 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                <Kanban className="w-24 h-24 text-blue-600" />
              </div>
              <p className="text-center mb-6 text-gray-700">
              Revolucione sua gestão com nossas ferramentas inovadoras. Utilize um calendário interativo que integra tarefas, 
              notas e eventos da empresa, além de um sistema Kanban inteligente, tudo em um único lugar para otimizar sua organização e 
              garantir máxima produtividade.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="w-full max-w-xs font-bold text-white">
                Acessar Gerenciamento <ArrowRight className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-100 text-gray-600 p-4 text-center border-t border-gray-200">
        <p>&copy; 2023 IntelliStocks. Todos os direitos reservados.</p>
        <p className="mt-2 text-sm">Impulsionando o futuro dos negócios com gestão inteligente</p>
      </footer>
    </div>
  )
}