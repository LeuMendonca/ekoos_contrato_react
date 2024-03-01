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


import { Card } from "../../../components/ui/card"


import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table"
import { Frown, Trash2 } from "lucide-react"
import RegisterItemContract, { ProductsProps } from "./RegisterItemContract"
import { Controller, useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { error } from "console"

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

const FormContractSchema = z.object({
    client: z.string({
        required_error: "Insira um cliente"
    }),
    franchise: z.string({
        required_error: "Insira uma franquia"
    }),
    hours: z.string({
        required_error: "Insira uma hora"
    }),
    initialDate: z.string({
        required_error: "Insira a data inicial"
    }).transform( val => val ? new Date(val).toISOString() : "error" ),
    finalDate: z.string({
        required_error: "Insira a data final"
    }).transform( val => val ?  new Date(val).toISOString() : "erro") ,
})

type ContractType = z.infer<typeof FormContractSchema>


export function RegisterContract() {
    
    const { register , control , reset , handleSubmit , formState: { errors}} = useForm<ContractType>({
        resolver: zodResolver(FormContractSchema)
    })

    function handleNewContract( data ){

        console.log(data)

        reset({
            client: '',
            franchise: '',
            hours: '',
            initialDate: '',
            finalDate: '',
        })
    }

    // Formulario de Produtos
    const [ products , setProducts ] = useState<ProductsProps[]>([])

    function handleSetProducts(data: ProductsProps){
        setProducts(state => [...state , data])
    }

    return (
        <div className="flex flex-col gap-1 shadow p-5 mt-2">
            <div className="grid grid-cols-8 flex-row gap-3">
                <form className="col-span-4 flex flex-col gap-2" onSubmit={handleSubmit(handleNewContract)}>
                    <h1 className="text-3xl font-medium mb-6">Cadastro de Contratos</h1>

                    <div>
                        <Controller
                            control={control}
                            name="client"
                            render={({field}) =>{
                                return(
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-[608px] focus:outline-none">
                                        <SelectValue placeholder="Cliente" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {clientes.map(cliente => <SelectItem value={`${cliente.cod_pessoa}`}>{cliente.nome}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            )}}
                        />
                        { errors.client &&
                            <span className="text-sm text-rose-500 pl-1">{ errors.client.message }</span>
                        }
                    </div>
                        

                    <div className="flex gap-2 grid-span-4">
                        <div>
                            <Controller
                                name="franchise"
                                control={control}
                                render={({field}) => {
                                    return(
                                        <Select onValueChange={field.onChange} value={field.value}>
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
                                    )
                                }}
                            />
                            { errors.franchise &&
                            <span className="text-sm text-rose-500 pl-1">{ errors.franchise.message }</span>
                            }
                        </div>

                        <div>
                            <Controller
                                name="hours"
                                control={control}
                                render={({field}) => {
                                    return(
                                        <Select onValueChange={field.onChange} value={field.value}>
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
                                    )
                                }}
                            />
                            { errors.hours &&
                            <span className="text-sm text-rose-500 pl-1">{ errors.hours.message }</span>
                            }
                        </div>
                    </div>

                    <div className="flex gap-2 grid-span-4">
                        <div>
                            <Input type="date" className="w-[300px] focus:outline-none" { ...register('initialDate' , {valueAsDate: false}) }/>
                            { errors.initialDate &&
                            <span className="text-sm text-rose-500 pl-1">{ errors.initialDate.message }</span>
                            }
                        </div>

                        <div>
                            <Input type="date" className="w-[300px] focus:outline-none" { ...register('finalDate' , {valueAsDate: false})}/>
                            { errors.finalDate &&
                            <span className="text-sm text-rose-500 pl-1">{ errors.finalDate.message }</span>
                            }
                        </div>
                    </div>

                    <div className="w-[608px] flex justify-end">
                        <Button variant={"destructive"} className="w-[300px] mt-4 ml-auto" type="submit">Gerar contrato</Button>
                    </div>

                </form>

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

                <Separator orientation="horizontal" className="w-full m-10"/>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium mb-6">Produtos</h1>

                    <RegisterItemContract handleSetProducts={handleSetProducts}/>
                    

                    
                        { products.length > 0  ?
                            <div className="my-5 w-[100%] m-auto col-span-8">
                                <Card>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableCell className="w-5 text-center">Produto</TableCell>
                                            <TableCell className="w-5 text-center">Quantidade</TableCell>
                                            <TableCell className="w-5 text-center">Unidade</TableCell>
                                            <TableCell className="w-10 text-center">Valor unitario</TableCell>
                                            <TableCell className="w-10 text-center">Valor total</TableCell>
                                            <TableCell className="w-5 text-center"></TableCell>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                    { products.map( item => (
                                        <TableRow>
                                            <TableCell className=" text-center">{ item.product }</TableCell>
                                            <TableCell className=" text-center">{ item.amount }</TableCell>
                                            <TableCell className=" text-center">{ item.units }</TableCell>
                                            <TableCell className=" text-center">{ item.unitPrice }</TableCell>
                                            <TableCell className=" text-center">{ item.totalPrice }</TableCell>
                                            <TableCell className=" text-center">
                                                    <Trash2 className="w-5 h-5 text-rose-500 cursor-pointer hover:text-rose-600 transition"/>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table></Card>
                            </div>
                            :
                            <div className="w-full flex items-center justify-center gap-1">
                                
                                    <Frown className="w-10 h-10 text-zinc-500"/> <span className="text-zinc-500 text-2xl">Nenhum produto adicionado</span>
                                
                            </div>
                        }
                    </div>
                </div>
    )
}
