import { Controller, useForm } from "react-hook-form"
import { Button } from "../../../../components/ui/button"
import { Input } from "../../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"

export function NewProduct({addNewProduct}) {

    const { register , handleSubmit , control , reset } = useForm()

  return (
    <form className="flex flex-row gap-1" onSubmit={handleSubmit(addNewProduct)}>
                
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

                    <Input type="number" placeholder="Quantidade" className="w-[150px]" { ...register('amount') }/>

                    <Controller
                        control={control}
                        name="units"
                        render={({ field }) => {
                        return (
                            <Select onValueChange={field.onChange} value={ field.value }>
                                <SelectTrigger className="w-[300px] focus:outline-none">
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

                    <Input type="text" placeholder="Valor unitário" className="w-[150px]" { ...register('unitPrice') }/>
                    <Input type="text" placeholder="Valor total" className="w-[150px]" { ...register('totalPrice') }/>

                    <Button type="submit" variant={"outline"}>Adicionar</Button>
                    </form>
  )
}
