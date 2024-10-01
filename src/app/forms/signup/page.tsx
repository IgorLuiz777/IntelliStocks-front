import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"

export default function SignUp() {

    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-100 text-gray-900">
            <Header />
            <section className="min-h-screen flex items-center justify-center">
                <Tabs defaultValue="estoques" className="w-[400px]">
                    <p className="text-3xl text-center font-bold">Criação de Conta</p>
                    <TabsContent value="estoques">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Estoques</CardTitle>
                                <CardDescription>
                                    Criar uma conta para acessar o sistema de estoques.
                                </CardDescription>
                            </CardHeader>
                            <TabsList className="grid grid-cols-2 mx-2 mb-4">
                                <TabsTrigger value="estoques">Estoques</TabsTrigger>
                                <TabsTrigger value="gestao">Gestão</TabsTrigger>
                            </TabsList>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input id="name" placeholder="Digite o nome" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="Digite o email empresarial" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input id="password" type="password" placeholder="Digite a senha" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Criar Conta</Button>
                            </CardFooter>
                            <CardFooter>
                                <p className="mr-1">Fazer Login?</p>
                                <Link href="/forms/signin" className="underline underline-offset-1 hover:text-blue-500">
                                Clique aqui</Link>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="gestao">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Gestão</CardTitle>
                                <CardDescription>
                                    Criar uma conta para acessar o sistema de gestão.
                                </CardDescription>
                            </CardHeader>
                            <TabsList className="grid grid-cols-2 mx-2 mb-4">
                                <TabsTrigger value="estoques">Estoques</TabsTrigger>
                                <TabsTrigger value="gestao">Gestão</TabsTrigger>
                            </TabsList>
                            <CardContent className="space-y-2">
                            <div className="space-y-1">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input id="name" placeholder="Digite o nome" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="Digite o email empresarial" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="departament">Departamento</Label>
                                    <Input id="departament" placeholder="Digite o departamento" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input id="password" type="password" placeholder="Digite a senha" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <p className="mr-1">Fazer Login?</p>
                                <Link href="/forms/signin" className="underline underline-offset-1 hover:text-blue-500">
                                Clique aqui</Link>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    );
}
