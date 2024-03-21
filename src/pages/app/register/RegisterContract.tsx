import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from "../../../components/ui/input"
import { Checkbox } from "../../../components/ui/checkbox"
import { Label } from "../../../components/ui/label"
import { Separator } from "../../../components/ui/separator"
import { Button } from "../../../components/ui/button"

import { SelectItemOtimizadoCustomizado, SelectOtimizadoCustomizado } from "../../../components/otimizacaoSelect/selectOtimizadoCustomizado"
import { api } from "../../../services/Axios"
import { Card } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from "../../../components/ui/table"
import { Frown, Trash2 } from "lucide-react"
import { contractVariables, franchise, hours, units } from "./Utilities/Utilities"

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosError } from "axios"

const FormContractSchema = z.object({
    client: z.number({
        required_error: "Insira um cliente"
    }).min(1, "Insira um cliente"),
    franchise: z.string({
        required_error: "Insira uma franquia"
    }).min(1, "Insira uma franquia"),
    hours: z.string({
        required_error: "Insira uma hora"
    }).min(1, "Insira uma hora"),
    initialDate: z.string({
        required_error: "Insira a data inicial"
    }).min(1, "Insira a data inicial"),
    finalDate: z.string({
        required_error: "Insira a data final"
    }).min(1, "Insira a data final"),
    totalPriceContract: z.number().optional(),
    
    cabos: z.boolean().default(false).optional(),
    chvTransAuto: z.boolean().default(false).optional(),
    chvTransManual: z.boolean().default(false).optional(),
    combustivel: z.boolean().default(false).optional(),
    instalacao: z.boolean().default(false).optional(),
    manutencaoPeriodica: z.boolean().default(false).optional(),
    transporte: z.boolean().default(false).optional(),
})

type ContractType = z.infer<typeof FormContractSchema>

interface ProductsProps {
    id: number
    product: string | number
    descProduct: string
    unit: string 
    amount: number
    unitPrice: number
}

export function RegisterContract() {

    // Hooks: useForm , useState 
    const { register, control , handleSubmit , setValue , reset , formState: { errors } } = useForm<ContractType>({
        resolver:  zodResolver(FormContractSchema),
        defaultValues: {
            client: 0,
            totalPriceContract: 0
        }
    })

    const [ products , setProducts ] = useState<ProductsProps[]>([])
    const [ costumers , setCostumers ] = useState([])

    const [ shoppingCart , setShoppingCart ] = useState<ProductsProps[]>([])

    const [ id , setId ] = useState(1)
    const [ item , setItem ] = useState('0')
    const [ unit , setUnit ] = useState('')
    const [ amount , setAmount ] = useState(0)
    const [ unitPrice , setUnitPrice ] = useState(0)
    const [ totalPriceContract , setTotalPriceContract ] = useState(0)

    useEffect(() =>{
        setValue('totalPriceContract' , totalPriceContract)
    },[totalPriceContract])

    // Funções
    async function handleSubmitContract(data:ContractType){
        try{
            const responsePost = await api.post('new-contract',{
                data:data,
                listItems: shoppingCart,
            })


        
            if( responsePost.status == 200){
                toast.success(`${responsePost.data.message}`,{
                    autoClose: 1000
                })

                setInterval(() => window.location.href = "/" , 2000)
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;

                const mensageError = axiosError.response.data.message

                toast.error(`${mensageError}`, {
                    autoClose: 2000
                });
            } else {
                // É outro tipo de erro
                console.error('Erro:', error.message);
            }
        }
    }


    async function addProductToShoppingCart(){

        const descProduct = products.find( c => c.value == item && c)

        console.log(item)

        const objNewProduct:ProductsProps = {
            id: id,
            product: item,
            descProduct: descProduct['label'],
            unit: unit ,
            amount: amount,
            unitPrice: unitPrice
        }

        setId( state => state + 1)

        setShoppingCart(state => [...state , objNewProduct])

        setItem('0')
        setUnit('')
        setAmount(0)
        setUnitPrice(0)
        setTotalPriceContract(state => state + ( +unitPrice * +amount ) )

        toast.success("Produto adicionado com sucesso!",{
            autoClose: 2500
        })
    }

    function deleteItemShoppingCart( idProduct: number){
        const contractDeleted = shoppingCart.filter( value => value.id == idProduct)[0]
        
        const recalculatingTotalContractValue = +contractDeleted["amount"] * +contractDeleted["unitPrice"]
        setTotalPriceContract(recalculatingTotalContractValue)

        setShoppingCart( shoppingCart.filter( value => value.id != idProduct ) )
    }

    function disabledButtonAdd(){
        if( item == '0' || !unit || amount == 0 || unitPrice == 0 ){
            return true
        }
    }

    // Requisições API
    async function getCostumers(){
        const costumers = await api.get('clientes')
        setCostumers(costumers.data)
    }

    async function getProducts(){
        const products = await api.get('produtos')
        setProducts(products.data)
    }



    useEffect(() => {
        getCostumers();
        getProducts();
    },[])

    return (
        <form className="flex flex-col gap-1 shadow p-5 mt-2" onSubmit={ handleSubmit(handleSubmitContract)}>
            <div className="grid grid-cols-8 flex-row gap-3">
                <div className="col-span-4 flex flex-col gap-2">
                    <h1 className="text-3xl font-medium mb-6">Cadastro de Contratos</h1>

                    <div>
                    <Controller
                            control={control}
                            name="client"
                            render={({field}) =>{
                                return(
                                    <SelectOtimizadoCustomizado 
                                        placeholder={"Selecione o cliente"}
                                        options={costumers}
                                        field={field}
                                        width={"608px"}
                                    />
                                )}}
                        />
                        {errors.client &&
                            <span className="text-sm text-rose-500 pl-1">{errors.client.message}</span>
                        }
                    </div>

                    <div className="flex gap-2 grid-span-4">
                        <div>
                            <Controller
                                name="franchise"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <SelectOtimizadoCustomizado 
                                            placeholder={"Selecione a franquia"}
                                            options={franchise}
                                            field={field}
                                            width={"300px"}
                                            heigth={150}
                                        />
                                    )
                                }}
                            />

                        {errors.franchise &&
                            <span className="text-sm text-rose-500 pl-1">{errors.franchise.message}</span>
                        }
                        </div>

                        <div>
                            <Controller
                                name="hours"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <SelectOtimizadoCustomizado 
                                            placeholder={"Selecione as horas"}
                                            options={hours}
                                            field={field}
                                            width={"300px"}
                                            heigth={150}
                                        />
                                    )
                                }}
                            />
                            {errors.hours &&<span className="text-sm text-rose-500 pl-1">{errors.hours.message}</span>}
                        </div>
                    </div>

                    <div className="flex gap-2 grid-span-4">
                        <div>
                            <Input type="date" className="block w-[300px] focus:outline-none" {...register('initialDate', { valueAsDate: false })} />
                            {errors.initialDate &&<span className="text-sm text-rose-500 pl-1">{errors.initialDate.message}</span>}
                        </div>

                        <div>
                            <Input type="date" className="block w-[300px] focus:outline-none" {...register('finalDate', { valueAsDate: false })} />
                            {errors.finalDate &&<span className="text-sm text-rose-500 pl-1">{errors.finalDate.message}</span>}
                        </div>
                    </div>

                </div>

                <Separator orientation="vertical" className="h-full relative left-10" />

                <div className="flex flex-col items-start justify-start gap-1 col-span-3 ">
                    <h1 className="text-3xl font-medium mb-6">Variaveis do Contrato</h1>
                    {contractVariables.map(variable => (
                            <Controller
                                control={control}
                                name={variable.id}
                                render={({field}) => {
                                    return(
                                         <span className="flex gap-1">
                                            <Checkbox 
                                                className="rounded-[3px] mb-1" 
                                                checked={field.value} 
                                                onCheckedChange={field.onChange}
                                            />
                                            <Label>{variable.label}</Label>
                                            
                                        </span>
                                    )
                                }}
                            />
                    ))}
                </div>
            </div>

            <Separator orientation="horizontal" className="my-[3rem]"/>
            
            <div className="flex flex-row gap-1 items-start">
                
                <div className="flex-1">
                    <span className="text-md font-medium">Produto</span>
                   
                    <SelectItemOtimizadoCustomizado
                        placeholder={"Selecione um produto"}
                        options={products}
                        width={"100%"}
                        heigth={245}
                        value={item}
                        onChange={setItem}
                    />
                    {item == '0' && <span className="text-sm text-rose-500 pl-1">Selecione no mínimo um produto</span> }
                </div>

                <div>
                    <span className="text-md font-medium">Unidades</span>
                    
                    <SelectItemOtimizadoCustomizado
                        options={units}
                        placeholder="Ex: Dias,Semanas"
                        width="200px"
                        heigth={245}
                        value={unit}
                        onChange={setUnit}
                    />
                    { !unit && <span className="text-sm text-rose-500 pl-1">Selecione uma unidade</span> }
                </div>
                
                <div>
                <span className="text-md font-medium">Quantidade</span>
                    <Input type="number" className="w-[170px]" placeholder="Ex: 10" value={amount!} onChange={( e ) => setAmount( e.target.value )}/>
                    { amount < 1 && <span className="text-sm text-rose-500 pl-1">Valor minimo: 1</span> }
                </div>

                <div>
                    <span className="text-md font-medium">Valor unitario</span>
                    <Input type="number" className="w-[170px]" placeholder="Ex: 3.65" value={unitPrice!} onChange={(e) => setUnitPrice(e.target.value)}/>
                    { unitPrice <= 0 && <span className="text-sm text-rose-500 pl-1">Valor minimo: 0.01</span> }
                </div>

                <div className="flex h-[64px] items-center">
                    <Button 
                        type="button" 
                        className="self-end transition-opacity" 
                        onClick={() => addProductToShoppingCart()} 
                        disabled={disabledButtonAdd()}>
                            Adicionar
                    </Button>
                </div>

            </div>

            <div className="flex flex-col">
                    
                        { shoppingCart.length > 0  ?
                            <div className="w-[100%] my-10 col-span-8">
                                <Card>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableCell className="w-5 text-center">Produto</TableCell>
                                                <TableCell className="text-center flex-1">Descrição</TableCell>
                                                <TableCell className="w-[9.375rem] text-center">Quantidade</TableCell>
                                                <TableCell className="w-[9.375rem] text-center">Unidade</TableCell>
                                                <TableCell className="w-[9.375rem] text-center">Valor unitario</TableCell>
                                                <TableCell className="w-[9.375rem] text-center">Valor total</TableCell>
                                                <TableCell className="w-5 text-center"></TableCell>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                        { shoppingCart.map( item => (
                                            <TableRow key={item.id}>
                                                <TableCell className=" text-center">{ item.product }</TableCell>
                                                <TableCell className=" text-center">{ item.descProduct }</TableCell>
                                                <TableCell className=" text-center">{ item.amount }</TableCell>
                                                <TableCell className=" text-center">{ item.unit }</TableCell>
                                                <TableCell className=" text-center">{ (+item.unitPrice).toLocaleString('pt-br',{style: 'currency' , currency: 'BRL'}) }</TableCell>
                                                <TableCell className=" text-center">{ (+item.amount * +item.unitPrice).toLocaleString('pt-br',{style: 'currency' , currency: 'BRL'}) }</TableCell>
                                                <TableCell className=" text-center">
                                                        <Trash2 
                                                            className="w-5 h-5 text-rose-500 cursor-pointer hover:text-rose-600 transition"
                                                            onClick={() => deleteItemShoppingCart(item.id)}
                                                        />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>

                                        <TableFooter>
                                            <TableRow>
                                            <TableCell colSpan={4}></TableCell>
                                            <TableCell colSpan={3} className="text-end">Valor total do contrato: {totalPriceContract.toLocaleString('pr-br' , { style: 'currency' , currency: 'BRL'})}</TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </Card>
                            </div>
                            :
                            <div className="w-full flex items-center justify-center gap-1 my-10">
                                
                                    <Frown className="w-10 h-10 text-zinc-500"/> <span className="text-zinc-500 text-2xl">Nenhum produto adicionado</span>
                                
                            </div>
                        }
                    </div>

            <div className="ml-auto">
                    <Button type="button" variant={"default"} className="w-[150px] mt-4 ml-auto disabled:!cursor-not-allowed disabled:pointer-events-auto">Limpar</Button>

                    <Button variant={"destructive"} className="w-[300px] mt-4 ml-3 disabled:!cursor-not-allowed disabled:pointer-events-auto" type="submit" disabled={shoppingCart.length == 0}>Gerar contrato</Button>
            </div>
        </form >
    )
}