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
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table"
import { Trash2, Underline } from "lucide-react"
import { Card } from "../../../components/ui/card"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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



interface ProductsProps{
    product: number
    amount: number
    units: string
    unitPrice: number
    totalPrice: number
}

const formProductSchema = z.object({
    product: z.string(),
    amount: z.string().min(1),
    units: z.string().min(1,'Valor minimo exigido: 1'),
    unitPrice: z.string().min(1,'Valor minimo exigido: 1'),
    totalPrice: z.string().min(1,'Valor minimo exigido: 1'),
})

type ProductType = z.infer<typeof formProductSchema>


export function RegisterContract() {
    
    const [ products , setProducts ] = useState<ProductsProps[]>([])

    const { register , handleSubmit , control , reset , getValues , watch , setValue , setFocus , formState: { errors } } = useForm<ProductType>({
        resolver: zodResolver(formProductSchema)
    })

    watch('amount')
    watch('unitPrice')

    async function handleAttTotalPrice( ){

            const amountCurrent = +(await getValues('amount'))
            const priceUnitCurrent = +( await getValues('unitPrice'))

            let calculo = amountCurrent * priceUnitCurrent

            console.log(calculo)

            setValue('totalPrice',  calculo )
            
    }
    

    function addNewProduct(data:ProductsProps ){
        setProducts(state => [...state , data])
        
        reset({
            'amount': undefined,
            'product': undefined,
            'units': undefined,
            'unitPrice': undefined,
            'totalPrice' : undefined
        });

        setFocus('amount')
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

                <form className="flex flex-row gap-1" onSubmit={handleSubmit(addNewProduct)}>
                
                <div className="flex flex-col gap-1">
                    <Controller
                        control={control}
                        name="product"
                        render={({ field }) => {
                        return (
                            <Select onValueChange={field.onChange} value={ field.value }>
                                <SelectTrigger className="w-[300px] focus:outline-none flex-1">
                                    <SelectValue placeholder="Produtos"/> 
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="1">Locação de motor v3</SelectItem>
                                    <SelectItem value="2">Locação de motor v4</SelectItem>
                                    <SelectItem value="3">Locação de motor v5</SelectItem>
                                    <SelectItem value="4">Locação de motor v6</SelectItem>
                                </SelectContent>
                            </Select>
                    )}}/>
                    <span className="text-sm text-rose-500 pl-1">{ errors.product && errors.product.message}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <Input 
                        placeholder="Quantidade" 
                        className="w-[150px]" { ...register('amount', { valueAsNumber: true}) } 
                        onInput={() => handleAttTotalPrice()}
                    />
                    <span className="text-sm text-rose-500 pl-1">{ errors.amount && errors.amount.message}</span>
                </div>

                <Controller
                    control={control}
                    name="units"
                    render={({ field }) => {
                    return (
                        <Select onValueChange={field.onChange} value={ field.value }>
                            <SelectTrigger className="w-[200px] focus:outline-none">
                                <SelectValue placeholder="Unidades"/>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Dias">Dias</SelectItem>
                                <SelectItem value="Semanas">Semanas</SelectItem>
                                <SelectItem value="Quinzenas">Quizenas</SelectItem>
                                <SelectItem value="Meses">Meses</SelectItem>
                                <SelectItem value="Horas">Horas</SelectItem>
                                <SelectItem value="KM">Quilometros</SelectItem>
                                <SelectItem value="UN">Unidades</SelectItem>
                            </SelectContent>
                        </Select>
                    )}}/>

                <Input 
                    placeholder="Valor unitário" 
                    className="w-[150px]" { ...register('unitPrice', { valueAsNumber: true}) } 
                    onInput={() => handleAttTotalPrice()}
                />

                <Input type="text" 
                    placeholder="Valor total" 
                    className="w-[150px]" 
                    { ...register('totalPrice') }
                    value={ getValues('totalPrice') }
                />

                <Button type="submit" variant={"outline"}>Adicionar</Button>
                </form>
                
                { products.length > 0  &&
                    <div className="my-5 w-[70%] m-auto">
                        <Card>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell className="w-5">Produto</TableCell>
                                    <TableCell className="w-5">Quantidade</TableCell>
                                    <TableCell className="w-5">Unidade</TableCell>
                                    <TableCell className="w-10">Valor unitario</TableCell>
                                    <TableCell className="w-10">Valor total</TableCell>
                                    <TableCell className="w-5"></TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                            { products.map( item => (
                                <TableRow>
                                    <TableCell>{ item.product }</TableCell>
                                    <TableCell>{ item.amount }</TableCell>
                                    <TableCell>{ item.units }</TableCell>
                                    <TableCell>{ item.unitPrice }</TableCell>
                                    <TableCell>{ item.totalPrice }</TableCell>
                                    <TableCell>
                                            <Trash2 className="w-5 h-5 text-rose-500 cursor-pointer hover:text-rose-600 transition"/>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table></Card>
                    </div>
                }
            </div>
        </div >
    )
}
