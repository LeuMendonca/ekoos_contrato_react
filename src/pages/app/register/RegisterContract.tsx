import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from "../../../components/ui/input"
import { Checkbox } from "../../../components/ui/checkbox"
import { Label } from "../../../components/ui/label"
import { Separator } from "../../../components/ui/separator"
import { Button } from "../../../components/ui/button"

import { SelectOtimizadoCustomizado } from "../../../components/otimizacaoSelect/selectOtimizadoCustomizado"
import { api } from "../../../services/Axios"

const contractVariables = [
    {id: "cabos",label: "Cabos"},
    {id: 'chvTransAuto', label: "Chave de transferência automática"},
    {id: 'chvTransManual' , label: "Chave de transferência manual"},
    {id: 'combustivel' , label: "Combustível" },
    {id: 'instalacao' , label: "Instalação"},
    {id: 'manutencaoPeriodicaa' , label: "Manutenção periódica" },
    {id: 'transporte' , label:"Transporte"}
]

const franchise = [
	{value: "1" , label: 'Diário'},
	{value: "7" , label: 'Semanal'},
	{value: "15" , label: 'Quinzenal'},
	{value: "30" , label: 'Mensal'},
]

const hours = [
{ value:"8", label: "8 horas" },
{ value:"12", label: "12 horas" },
{ value:"16", label: "16 horas" },
{ value:"24", label: "24 horas" },
]

const units = [
    { value:"Dias" , label: "Dias" },
    { value:"Semanas" , label: "Semanas" },
    { value:"Quinzenas" , label: "Quizenas" },
    { value:"Meses" , label: "Meses" },
    { value:"Horas" , label: "Horas" },
    { value:"KM" , label: "Quilometros" },
    { value:"UN" , label: "Unidades" },
]

const FormItemsSchema = z.object({
    product: z.string().min(1,"Insira um produto"),
    units: z.string().min(1,"Insira um produto"),
    amount: z.string().min(1,'Quantidade minima: 1'),
    unitPrice: z.string().min(1,'Valor minimo: 1'),
})

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
    }).min(1, "Insira a data inicial").transform(val => val && new Date(val).toISOString()),
    finalDate: z.string({
        required_error: "Insira a data final"
    }).min(1, "Insira a data final").transform(val => val && new Date(val).toISOString()),
    
    cabos: z.boolean().default(false).optional(),
    chvTransAuto: z.boolean().default(false).optional(),
    chvTransManual: z.boolean().default(false).optional(),
    combustivel: z.boolean().default(false).optional(),
    instalacao: z.boolean().default(false).optional(),
    manutencaoPeriodicaa: z.boolean().default(false).optional(),
    transporte: z.boolean().default(false).optional(),

    product: z.string({
        required_error: "Insira um produto"
    }).min(1,"Insira um produto"),
    units: z.string({
        required_error: "Insira uma unidade"
    }).min(1,"Insira uma unidade"),
    amount: z.string().min(1,'Quantidade minima: 1'),
    unitPrice: z.string().min(1,'Valor minimo: 1'),
});



type ContractType = z.infer<typeof FormContractSchema>
interface ProductsProps {
    product: string 
    units: string
    amount: string
    unitPrice: string
}

export function RegisterContract() {

    // Hooks: useForm , useState 
    const { register, control, reset , handleSubmit , getValues , formState: { errors } } = useForm<ContractType>({
        resolver:  zodResolver(FormContractSchema)
        
    })

    const [ costumers , setCostumers ] = useState([])
    const [ products , setProducts ] = useState([])

    const [ shoppingCart , setShoppingCart ] = useState<ProductsProps[]>([])


    // Funções
    function handleSubmitContract(data:ContractType){
        console.log(data)
    }

    function addProductToShoppingCart(){
        const objProduct = {
            product: getValues('product'),
            units: getValues('units'),
            amount: getValues('amount'),
            unitPrice: getValues('unitPrice'),
        }
        setShoppingCart( state => [...state , objProduct])
        // setShoppingCart(( previous ) => [...previous , objProduct])
    }

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
                                            heigth={"150px"}
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
                                            heigth={"150px"}
                                        />
                                    )
                                }}
                            />
                            {errors.hours &&<span className="text-sm text-rose-500 pl-1">{errors.hours.message}</span>}
                        </div>
                    </div>

                    <div className="flex gap-2 grid-span-4">
                        <div>
                            <Input type="date" className="w-[300px] focus:outline-none" {...register('initialDate', { valueAsDate: false })} />
                            {errors.initialDate &&<span className="text-sm text-rose-500 pl-1">{errors.initialDate.message}</span>}
                        </div>

                        <div>
                            <Input type="date" className="w-[300px] focus:outline-none" {...register('finalDate', { valueAsDate: false })} />
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

            <div className="flex flex-row gap-1">

                <div className="flex-1">
                    <Controller
                        control={control}
                        name="product"
                        render={({field}) => {
                            return(
                                <SelectOtimizadoCustomizado 
                                    placeholder={"Selecione um produto"}
                                    options={products}
                                    field={field}
                                    width={"100%"}
                                    heigth={245}
                            />
                            )
                        }}
                    />
                    {errors.product &&<span className="text-sm text-rose-500 pl-1">{errors.product.message}</span>}
                </div>
                    
                <div>
                    <Controller
                        name="units"
                        control={control}
                        render={ ( { field } ) => {
                            return(
                                <SelectOtimizadoCustomizado
                                options={units}
                                field={field}
                                placeholder="Horas"
                                width="170px"
                                heigth={245}
                                />
                                )
                            }}
                    />
                    {errors.units &&<span className="text-sm text-rose-500 pl-1">{errors.units.message}</span>}
                </div>
                
                <div>
                    <Input className="w-[170px]" placeholder="Quantidade" { ...register('amount') }/>
                    {errors.amount &&<span className="text-sm text-rose-500 pl-1">{errors.amount.message}</span>}
                </div>

                <div>
                    <Input className="w-[170px]" placeholder="Valor unitário" { ...register('unitPrice')}/>
                    {errors.unitPrice &&<span className="text-sm text-rose-500 pl-1">{errors.unitPrice.message}</span>}
                </div>

                <Button type="button" onClick={ () => addProductToShoppingCart()}>Adicionar</Button>

            </div>

            { shoppingCart.map( item => ( 
                <div>
                    <p>{item.product}</p> 
                    <p>{item.units}</p> 
                    <p>{item.amount}</p> 
                    <p>{item.unitPrice}</p> 
                </div>
            ))}

            <div className="ml-auto">
                    <Button type="button" variant={"default"} className="w-[150px] mt-4 ml-auto disabled:!cursor-not-allowed disabled:pointer-events-auto" onClick={() => resetForms()}>Limpar</Button>
                    <Button variant={"destructive"} className="w-[300px] mt-4 ml-3 disabled:!cursor-not-allowed disabled:pointer-events-auto" type="submit">Gerar contrato</Button>
            </div>
        </form >
    )
}
