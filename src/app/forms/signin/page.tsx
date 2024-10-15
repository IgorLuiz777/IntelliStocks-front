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

export default function SignIn() {
    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-100 text-gray-900">
            <Header />
            <section className="min-h-screen flex items-center justify-center">
                <Tabs defaultValue="estoques" className="w-[400px]">
                    <p className="text-3xl text-center font-bold">Entrar</p>
                    <TabsContent value="estoques">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Estoques</CardTitle>
                                <CardDescription>
                                    Acessar o sistema de estoques.
                                </CardDescription>
                            </CardHeader>
                            <TabsList className="grid grid-cols-2 mx-6 mb-4">
                                <TabsTrigger value="estoques">Estoques</TabsTrigger>
                                <TabsTrigger value="gestao">Gestão</TabsTrigger>
                            </TabsList>
                            <CardContent className="space-y-2">
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
                                <p className="mr-1">Criar usuário?</p>
                                <Link href="/forms/signup" className="underline underline-offset-1 hover:text-blue-500">
                                Clique aqui</Link>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="gestao">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Gestão</CardTitle>
                                <CardDescription>
                                    Acessar o sistema de gestão.
                                </CardDescription>
                            </CardHeader>
                            <TabsList className="grid grid-cols-2 mx-6 mb-4">
                                <TabsTrigger value="estoques">Estoques</TabsTrigger>
                                <TabsTrigger value="gestao">Gestão</TabsTrigger>
                            </TabsList>
                            <CardContent className="space-y-2">
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
                                <p className="mr-1">Criar usuário?</p>
                                <Link href="/forms/signup" className="underline underline-offset-1 hover:text-blue-500">
                                Clique aqui</Link>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </section>
        </main>
    );
}