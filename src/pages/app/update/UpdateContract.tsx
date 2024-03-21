import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from "../../../components/ui/input"
import { Checkbox } from "../../../components/ui/checkbox"
import { Label } from "../../../components/ui/label"
import { Separator } from "../../../components/ui/separator"
import { Button } from "../../../components/ui/button"

import { SelectItemOtimizadoCustomizado, SelectItemUpdateOtimizadoCustomizado, SelectOtimizadoCustomizado } from "../../../components/otimizacaoSelect/selectOtimizadoCustomizado"
import { api } from "../../../services/Axios"
import { Card } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from "../../../components/ui/table"
import { Frown, SquarePen, Trash2 } from "lucide-react"

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contractVariables, franchise, hours, units } from "../register/Utilities/Utilities"
import { useParams } from "react-router-dom"
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
});

type ContractType = z.infer<typeof FormContractSchema>

interface ProductsUpdateProps {
    id: number
    seq_contrato_detalhe: number 
    product: string | number
    descProduct: string | undefined
    unit: string 
    amount: number
    unitPrice: number
}

export function UpdateContract() {

    // Hooks: useForm , useState 
    const { register, control , handleSubmit , setValue , getValues , formState: { errors } } = useForm<ContractType>({
        resolver:  zodResolver(FormContractSchema),
        defaultValues: {
            client: 0,
            totalPriceContract: 0
        }
    })

    const { seq_contrato } = useParams()

    const [ products , setProducts ] = useState<ProductsUpdateProps[]>([])
    const [ costumers , setCostumers ] = useState([])

    const [ shoppingCart , setShoppingCart ] = useState<ProductsUpdateProps[]>([])

    const [ id , setId ] = useState(1)
    const [ item , setItem ] = useState('0')
    const [ unit , setUnit ] = useState('')
    const [ amount , setAmount ] = useState(0)
    const [ unitPrice , setUnitPrice ] = useState(0)

    const totalPriceContract = shoppingCart.reduce( ( acc , item ) => {
        return acc + ( item.amount * item.unitPrice)
    },0)

    useEffect(() => {
        setValue("totalPriceContract",totalPriceContract)
    },[totalPriceContract])

    // Funções
    async function handleSubmitUpdateContract(data:ContractType){
        try {
            const responsePutUpdate = await api.put(`update-contract/${seq_contrato}`,  {
                data: data ,
                itens: shoppingCart
            })

            if( responsePutUpdate.status == 200){
                toast.success(responsePutUpdate.data.message,{
                    autoClose: 1000
                })
    
                setInterval(() => window.location.href = "/" , 2000)
            }
            
        } catch (error) {
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

        const objNewProduct: ProductsUpdateProps = {
            id: id,
            seq_contrato_detalhe: 0,
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

        toast.success("Produto adicionado com sucesso!",{
            autoClose: 2500
        })
    }

    function deleteItemShoppingCart( idProduct: number){
        setShoppingCart( shoppingCart.filter( value => value.id != idProduct ) )
    }

    function disabledButtonAdd(){
        if( item == '0' || !unit || amount == 0 || unitPrice == 0 ){
            return true
        }
    }

    async function handleAlterInfo( valueInput:string | number, id:number ,campo:string ){
        console.log(valueInput)
        setShoppingCart(shoppingCart.map(value => {
            if (value.id === id) {
                return { ...value, [campo]: valueInput };
            }
            return value;
        }));
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

    async function getContractID(){
        const contractID = await api.get(`get-contract-id/${seq_contrato}`)
        
        const headerContract = contractID.data
        // Preenchendo os valores do hook form
        Object.entries( headerContract["contract"] ).forEach(([key , value]) => {
            if ( key != "totalPriceContract"){
                setValue(key, value)
            }
        })
        
        setShoppingCart(headerContract["contractDetails"])

        setId(headerContract["contractDetails"].length + 1)
    }

    useEffect(() => {
        getCostumers();
        getProducts();
        getContractID();
    },[])

    return (
        <form className="flex flex-col gap-1 shadow p-5 mt-2" onSubmit={ handleSubmit(handleSubmitUpdateContract)}>
            
            <div className="grid grid-cols-8 flex-row gap-3">
                <div className="col-span-4 flex flex-col gap-2">
                    <h1 className="text-3xl font-medium mb-6">Atualização Contrato {seq_contrato}</h1>

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
                    <Input type="number" className="w-[170px]" placeholder="Ex: 10" value={amount!} onChange={( e ) => setAmount( +e.target.value )}/>
                    { amount < 1 && <span className="text-sm text-rose-500 pl-1">Valor minimo: 1</span> }
                </div>

                <div>
                    <span className="text-md font-medium">Valor unitario</span>
                    <Input type="number" className="w-[170px]" placeholder="Ex: 3.65" value={unitPrice!} onChange={(e) => setUnitPrice(+e.target.value)}/>
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
                                        { shoppingCart.map( ( item ) => {
                                            return (
                                                <TableRow key={item.id} className="h-[4.37rem]">
                                                    <TableCell className="text-center">
                                                        <Card className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50">
                                                            { item.product }
                                                        </Card>
                                                    </TableCell>

                                                    <TableCell className="text-start">
                                                        {/* { item.descProduct } */}
                                                        <SelectItemUpdateOtimizadoCustomizado
                                                            placeholder={"Selecione um produto"}
                                                            options={products}
                                                            width={"100%"}
                                                            heigth={250}
                                                            value={ item.product.toString() }
                                                            onChange={handleAlterInfo}
                                                            idItem={item.id}
                                                            inputName={"product"}
                                                        />
                                                    </TableCell>

                                                    <TableCell className="text-center">
                                                        <Input 
                                                            value={ item.amount } 
                                                            className="text-center bg-transparent w-full"
                                                            onChange={ ( e ) => handleAlterInfo(e.target.value , item.id , "amount")}
                                                        />
                                                    </TableCell>
                                                    
                                                    <TableCell className="text-start">
                                                        <SelectItemUpdateOtimizadoCustomizado
                                                            options={units}
                                                            placeholder="Ex: Dias,Semanas"
                                                            width="200px"
                                                            heigth={245}
                                                            value={ item.unit }
                                                            onChange={handleAlterInfo}
                                                            idItem={item.id}
                                                            inputName={"unit"}
                                                        />
                                                    </TableCell>
                                                    
                                                    <TableCell className=" text-center">
                                                        <Input 
                                                            value={ (+item.unitPrice) } className="text-center bg-transparent w-full"
                                                            onChange ={ ( e ) => handleAlterInfo(e.target.value , item.id , "unitPrice")}
                                                        />
                                                        
                                                    </TableCell>
                                                    
                                                    <TableCell className="text-center">
                                                        <Card className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50">
                                                            {
                                                                (item.amount * item.unitPrice).toLocaleString('pr-br' , { style: 'currency' , currency: 'BRL'})
                                                            }
                                                        </Card>
                                                    </TableCell>

                                                    <TableCell className="flex items-center justify-center gap-2 text-center">
                                                            <Trash2 
                                                                className="w-5 h-5 text-rose-500 cursor-pointer hover:text-rose-600 transition"
                                                                onClick={ () => deleteItemShoppingCart(item.id) }
                                                            />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                        </TableBody>

                                        <TableFooter>
                                            <TableRow>
                                                <TableCell colSpan={4}></TableCell>
                                            
                                                <TableCell colSpan={3} className="text-end">
                                                    Valor total do contrato: { totalPriceContract.toLocaleString('pr-br' , { style: 'currency' , currency: 'BRL'}) }
                                                </TableCell>
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

                    <Button variant={"destructive"} className="w-[300px] mt-4 ml-3 disabled:!cursor-not-allowed disabled:pointer-events-auto" type="submit" disabled={shoppingCart.length == 0}>Atualizar Contrato</Button>
            </div>
        </form >
    )
}