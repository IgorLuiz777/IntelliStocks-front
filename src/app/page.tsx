"use client"

import { useEffect } from "react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Package, Kanban, ArrowRight, Zap } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-100 text-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center justify-between mb-16"
        >
          <motion.div variants={itemVariants} className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold text-blue-600 mb-4">
              Bem-vindo ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">IntelliStocks</span>
            </h1>
            <p className="text-2xl text-gray-700 mb-6">
              Gerencie seus negócios de forma inteligente e personalizada com o nosso Sistema de Gestão completo.
            </p>
            <Link href={"/forms/signup"}>
              <Button className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-500 
              hover:from-blue-700 hover:to-cyan-600 transition-transform duration-300 transform hover:scale-105">
                Comece Agora <Zap className="ml-2" />
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} className="md:w-1/2 flex justify-center">
            <div >
              <motion.div whileHover={{ scale: 1.02 }} >
                <Image
                  src="/assets/ai05.jpg"
                  alt="IntelliStocks Image 01"
                  width={700}
                  height={375}
                  className="rounded-lg shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-white border-blue-200 border-2 hover:border-blue-400 transition-all duration-300 
            shadow-lg hover:shadow-xl transform hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600 flex items-center">
                  <Package className="mr-2" /> Gerenciamento de Estoques
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Controle inteligente de produtos e fornecedores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg mb-4 flex items-center justify-center">
                  <Package className="w-24 h-24 text-blue-600" />
                </div>
                <p className="text-center mb-6 text-gray-700">
                  Acesse nosso sistema de gerenciamento de estoques de última geração, agora com IA integrada para previsão de demandas.
                  Otimize seu inventário automaticamente, com email personalizado e automático para garantir que seu estoque esteja
                  sempre abastecido.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href={"/forms/signin"}>
                  <Button className="w-full max-w-xs font-bold text-white bg-gradient-to-r 
                  from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                    Acessar Estoques <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white border-blue-200 border-2 hover:border-blue-400 
            transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-600 flex items-center">
                  <Kanban className="mr-2" /> Gestão Inteligente
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Revolucione sua organização e planejamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg mb-4 flex items-center justify-center">
                  <Kanban className="w-24 h-24 text-blue-600" />
                </div>
                <p className="text-center mb-6 text-gray-700">
                  Revolucione sua gestão com nossas ferramentas inovadoras. Utilize um calendário interativo que integra tarefas,
                  notas e eventos da empresa, além de um sistema Kanban inteligente, tudo em um único lugar para otimizar sua organização e
                  garantir máxima produtividade.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href={"/forms/signin"}>
                  <Button className="w-full max-w-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700
                  hover:to-cyan-600">
                    Acessar Gerenciamento <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
