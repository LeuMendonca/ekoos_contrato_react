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
import { fromZodError } from 'zod-validation-error';
import { Card } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table"
import { Frown, Trash2 } from "lucide-react"

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
    { value: "" , label: "Selecione unidades"},
    { value:"Dias" , label: "Dias" },
    { value:"Semanas" , label: "Semanas" },
    { value:"Quinzenas" , label: "Quizenas" },
    { value:"Meses" , label: "Meses" },
    { value:"Horas" , label: "Horas" },
    { value:"KM" , label: "Quilometros" },
    { value:"UN" , label: "Unidades" },
]

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
    
    cabos: z.boolean().default(false).optional(),
    chvTransAuto: z.boolean().default(false).optional(),
    chvTransManual: z.boolean().default(false).optional(),
    combustivel: z.boolean().default(false).optional(),
    instalacao: z.boolean().default(false).optional(),
    manutencaoPeriodicaa: z.boolean().default(false).optional(),
    transporte: z.boolean().default(false).optional(),
});

const FormProductSchema = z.object({
    product: z.string({
        required_error: "Insira um produto"
    }).optional(),
    descProduct: z.string().optional(),
    units: z.string({
        required_error: "Insira uma unidade"
    }),
    amount: z.string(),
    unitPrice: z.string(),
})

const MergeFormContractSchema = z.union([
    FormContractSchema,
    FormProductSchema
])

type ContractType = z.infer<typeof MergeFormContractSchema>

interface ProductsProps {
    id: number
    product: string 
    descProduct?: string
    units: string 
    amount: string
    unitPrice: string
}

export function RegisterContract() {

    // Hooks: useForm , useState 
    const { register, control , handleSubmit , reset , watch, getValues , formState: { errors } } = useForm<ContractType>({
        resolver:  zodResolver(MergeFormContractSchema)
    })

    const [ costumers , setCostumers ] = useState([])
    const [ products , setProducts ] = useState<ProductsProps[]>([])

    const [ shoppingCart , setShoppingCart ] = useState<ProductsProps[]>([])
    const [ id , setId ] = useState<number>(1)

    // Observando produto
    watch('amount')
    watch('units')
    watch('product')
    watch('unitPrice')

    // Funções
    function handleSubmitContract(data:ContractType){
        const schemaProduct = FormProductSchema.parse({
            product: getValues('product'),
            units: getValues('units'),
            amount: getValues('amount'),
            unitPrice: getValues('unitPrice')
        })

        const schemaContract = FormContractSchema.parse(data)

        if( !schemaContract || !schemaProduct) return;

        api.post('new-contract',data)
        console.log(data)
        console.log(shoppingCart)
    }


    function addProductToShoppingCart(){

        const product = getValues('product')

        const descProduto = products.find( c => c['value'] == product && c["label"])

        const objProduct = {
            id: id,
            product: product,
            descProduct: descProduto!['label'],
            units: getValues('units'),
            amount: getValues('amount'),
            unitPrice: getValues('unitPrice'),
        }
        
        try{
            const schemaProduct = FormProductSchema.parse(objProduct)

            setShoppingCart( state => [...state , objProduct])
            setId( state => state + 1)
            
            reset({
                product: '0',
                units: '',
                amount: '',
                unitPrice: ''
            })

        }catch(err:any){
            const validationError = fromZodError(err)
            const messageError = validationError.message.toString().split(';')

            const listErrors:any = []

            messageError.forEach( message => {
                const formatListMessage = message.split(" ")
                const jsonValue = formatListMessage[formatListMessage.length - 1].replace(/"/g, '')

                const textMessage = formatListMessage.slice(1,formatListMessage.indexOf("at")).join(" ")

                const jsonMessage = { input: jsonValue ,  message: textMessage }

                listErrors.push([...listErrors , jsonMessage ])
            })
            return listErrors
        }
    }

    function disabledAddProduct(){
        if( getValues("product") == '0' || !getValues("units") || !getValues("amount") || !getValues("unitPrice") ) return true;
    }

    function deleteItemShoppingCart( idProduct: number){
        setShoppingCart( shoppingCart.filter( value => value.id != idProduct ) )
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
            
            <div className="flex flex-row gap-1 items-start">
                
                <div className="flex-1">
                    <span className="text-md font-medium">Produto</span>
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
                    { getValues("product") === '0' ? <span className="text-sm text-rose-500 pl-1">Selecione um produto</span> : <span>{''}</span>}
                </div>
                    
                <div>
                    <span className="text-md font-medium">Unidades</span>
                    <Controller
                        name="units"
                        control={control}
                        render={ ( { field } ) => {
                            return(
                                <SelectOtimizadoCustomizado
                                    options={units}
                                    field={field}
                                    placeholder="Ex: Dias,Semanas"
                                    width="170px"
                                    heigth={245}
                                />
                                )
                            }}
                    />
                    { !getValues("units") && <span className="text-sm text-rose-500 pl-1">Insira uma unidade</span>}
                </div>
                
                <div>
                <span className="text-md font-medium">Quantidade</span>
                    <Input className="w-[170px]" placeholder="Ex: 10" { ...register('amount') }/>
                    { !getValues("amount") && <span className="text-sm text-rose-500 pl-1">Valor minimo: 1</span>}
                </div>

                <div>
                    <span className="text-md font-medium">Valor unitario</span>
                    <Input className="w-[170px]" placeholder="Ex: 3.65" { ...register('unitPrice')}/>
                    { !getValues("unitPrice") && <span className="text-sm text-rose-500 pl-1">Valor minimo: 1</span>}
                </div>

                <div className="flex h-[64px] items-center">
                    <Button type="button" className="self-end transition-opacity" onClick={ () => addProductToShoppingCart()} disabled={disabledAddProduct()}>Adicionar</Button>
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
                                                <TableCell className=" text-center">{ item.units }</TableCell>
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
                    <Button type="button" variant={"default"} className="w-[150px] mt-4 ml-auto disabled:!cursor-not-allowed disabled:pointer-events-auto" onClick={() => resetForms()}>Limpar</Button>

                    <Button variant={"destructive"} className="w-[300px] mt-4 ml-3 disabled:!cursor-not-allowed disabled:pointer-events-auto" type="submit">Gerar contrato</Button>
            </div>
        </form >
    )
}
