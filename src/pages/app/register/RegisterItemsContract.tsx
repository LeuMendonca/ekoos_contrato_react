import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { ProductsProps } from "./RegisterContract";
import * as z from 'zod'

interface RegisterItemsContractProps{
    handleSetProducts: ( objProduct: ProductsProps ) => void
}

export const productInputsSchema = z.object({
    product: z.string().min(1,"Adicione um item"),
    amount: z.number().min(1,"Valor minimo: 1"),
    units: z.string(),
    unitPrice: z.number().min(1,"Valor minimo: 1"),
    totalPrice: z.number().min(1,"Valor minimo: 1"),
})

export function RegisterItemsContract({handleSetProducts}:RegisterItemsContractProps) {

    const [ product , setProduct ] = useState('')
    const [ amount , setAmount ] = useState<number>(0)
    const [ units , setUnits ] = useState('')
    const [ unitPrice , setUnitPrice ] = useState(0)
    const [ totalPrice , setUnitTotal ] = useState(null)

    useEffect(() => {
        if( +amount! > 0 && +unitPrice! > 0 ){
            const calculo = +amount! * +unitPrice!
            setUnitTotal(calculo)
        }
    },[ amount , unitPrice ])

    function resetProduct(){
        setProduct('')
        setAmount(null)
        setUnits('')
        setUnitPrice(null)
        setUnitTotal(null)
    }

    function handleAddNewProduct(){

        const objProduct: ProductsProps = {
            product,
            amount,
            units,
            unitPrice,
            totalPrice
        }

        resetProduct()
        
    }


    return (
        <div className="flex flex-row gap-1">

            <div className="flex-1">
                <Select value={ product } onValueChange={ ( valor ) => setProduct(valor)}>
                    <SelectTrigger className="focus:outline-none">
                        <SelectValue placeholder="Produtos" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="1">Locação de motor v3</SelectItem>
                        <SelectItem value="2">Locação de motor v4</SelectItem>
                        <SelectItem value="3">Locação de motor v5</SelectItem>
                        <SelectItem value="4">Locação de motor v6</SelectItem>
                        <SelectItem value="5">
                            Locação de motor v7 muito muito muito potente mas é muito
                            potente mesmo
                        </SelectItem>
                    </SelectContent>
                </Select>

                { !product && <span className="text-sm text-rose-500 pl-1 ">Selecione um item</span>}
            </div>

            <div>
                <Input
                    type="number"
                    placeholder="Quantidade"
                    className="w-[150px]"
                    onChange={( e ) => {
                        setAmount(+e.target.value)
                    }}
                    value={ amount }
                />
                { +amount! < 1 && <span className="text-sm text-rose-500 pl-1 ">Valor minimo: 1</span>}
            </div>


            <div>
                <Select value={ units } onValueChange={ ( unit ) => setUnits( unit ) }>
                    <SelectTrigger className="w-[200px] focus:outline-none">
                        <SelectValue placeholder="Unidades" />
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

                { !units && <span className="text-sm text-rose-500 pl-1 ">Selecione uma unidade</span>}
            </div>


            <div>
                <Input
                    type="number"
                    placeholder="Valor unitário"
                    className="w-[150px]"
                    value={ unitPrice }
                    onChange={( e ) => {
                        setUnitPrice( +e.target.value )
                    }}
                />
                { +unitPrice! < 1 && <span className="text-sm text-rose-500 pl-1 ">Valor minimo: 1</span>}
            </div>

            <Input
                type="number"
                placeholder="Valor total"
                className="w-[150px]"
                disabled
                value={ totalPrice }
            />

            <Button type="button" variant={"default"} onClick={handleAddNewProduct}>
                Adicionar
            </Button>
        </div>
    )
}
