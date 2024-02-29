import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Checkbox } from "../../../components/ui/checkbox"
import { Label } from "../../../components/ui/label"
import { Separator } from "../../../components/ui/separator"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { NewProduct } from "./components/newProduct"

const clientes = [
    { nome: 'Leonardo', cod_pessoa: 1 },
    { nome: 'Rider', cod_pessoa: 2 },
    { nome: 'Douglas', cod_pessoa: 3 },
    { nome: 'Gabriel', cod_pessoa: 4 },
    { nome: 'Thais', cod_pessoa: 5 }
]

const contractVariables = [
    "Cabos",
    "Chave de transferência automática",
    "Chave de transferência manual",
    "Combustível",
    "Instalação",
    "Manutenção periódica",
    "Transporte"
]

enum Units{
    Dias,
    Semanas,
    Quinzenas,
    Meses,
    Horas,
    KM,
    UN
}

interface ProductsProps{
    product: number
    amount: number
    units: Units
    unitPrice: number
    totalPrice: number
}


export function RegisterContract() {
    
    const [ products , setProducts ] = useState<ProductsProps[]>([])

    const { register , handleSubmit , control , reset } = useForm()

    function addNewProduct(data:ProductsProps ){
        setProducts(state => [...state , data])
        console.log(data)
        reset({
            product: '',
            units: ''
        });
    }

    return (
        <div className="flex flex-col gap-1 shadow p-5 mt-2">
            <div className="grid grid-cols-8 flex-row gap-3">
                <div className="col-span-4 flex flex-col gap-2">
                    <h1 className="text-3xl font-medium mb-6">Cadastro de Contratos</h1>
                    <Select>
                        <SelectTrigger className="w-[608px] focus:outline-none">
                            <SelectValue placeholder="Cliente" />
                        </SelectTrigger>

                        <SelectContent>
                            {clientes.map(cliente => <SelectItem value={`${cliente.cod_pessoa}`}>{cliente.nome}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <div className="flex gap-2 grid-span-4">
                        <Select>
                            <SelectTrigger className="w-[300px] focus:outline-none"  >
                                <SelectValue placeholder="Franquia" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="1">Diário</SelectItem>
                                <SelectItem value="7">Semanal</SelectItem>
                                <SelectItem value="15">Quinzenal</SelectItem>
                                <SelectItem value="30">Mensal</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select>
                            <SelectTrigger className="w-[300px] focus:outline-none">
                                <SelectValue placeholder="Horas" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="8">8 horas</SelectItem>
                                <SelectItem value="12">12 horas</SelectItem>
                                <SelectItem value="16">16 horas</SelectItem>
                                <SelectItem value="24">24 horas</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2 grid-span-4">
                        <Input type="date" className="w-[300px] focus:outline-none" />
                        <Input type="date" className="w-[300px] focus:outline-none" />
                    </div>

                    <div className="w-[608px] flex justify-end">
                        <Button variant={"destructive"} className="w-[300px] mt-4 ml-auto">Gerar contrato</Button>
                    </div>


                </div>

                <Separator orientation="vertical" className="h-full relative left-10" />

                <div className="flex flex-col items-start justify-start gap-1 col-span-3 ">
                    <h1 className="text-3xl font-medium mb-6">Variaveis do Contrato</h1>
                    {contractVariables.map(variable => (
                        <span className="flex gap-1">
                            <Checkbox className="rounded-[3px] mb-1" />
                            <Label>{variable}</Label>
                        </span>
                    ))}

                </div>
            </div>

            <Separator orientation="horizontal" className="w-full my-7" />

            <div className="flex flex-col">
                <h1 className="text-3xl font-medium mb-6">Produtos</h1>

                <NewProduct addNewProduct={addNewProduct}/>

                { products.map( item => item.product)}
            </div>
        </div >
    )
}
