import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export interface ProductsProps{
    product: string
    amount: string
    units: string
    unitPrice: string
    totalPrice: string
}

interface RegisterItemContractProps{
    handleSetProducts: ( data: ProductsProps ) => void
}

const formProductSchema = z.object({
    product: z.string({
        required_error: 'Informe um produto'
    }).min(1,'Informe um produto'),
    amount: z.string().min(1,'Valor minimo exigido: 1'),
    units: z.string({
        required_error: 'Informe uma unidade',
      }).min(1,'Informe uma unidade'),
    unitPrice: z.string().min(1,'Valor minimo exigido: 1').transform( val => Number(val).toLocaleString('pt-BR',{style: 'currency',currency: 'BRL'})),
    totalPrice: z.string().min(1,'Valor minimo exigido: 1').transform( val => Number(val).toLocaleString('pt-BR',{style: 'currency',currency: 'BRL'})),
})

type ProductType = z.infer<typeof formProductSchema>

export default function RegisterItemContract({handleSetProducts}:RegisterItemContractProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(formProductSchema),
  });

    watch('amount')
    watch('unitPrice')

    async function handleAttTotalPrice( ){

            const amountCurrent = +(await getValues('amount'))
            const priceUnitCurrent = +( await getValues('unitPrice'))

            let calculo = amountCurrent * priceUnitCurrent

            console.log(calculo)

            setValue('totalPrice',  calculo.toString() )
            
    }

    function addNewProduct( data:ProductsProps ){

        setFocus('amount',{shouldSelect:true})

        handleSetProducts(data)

        reset({
            'amount': '',
            'product': '',
            'units': '',
            'unitPrice': '',
            'totalPrice' : ''
        });
    }


  return (
      <form
        className="flex flex-row gap-1"
        onSubmit={() => handleSubmit( addNewProduct)}
      >
        <div className="flex-1">
          <Controller
            control={control}
            name="product"
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
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
              );
            }}
          />
          {<span className="text-sm text-rose-500 pl-1 ">
            {errors.product && errors.product.message}
          </span>}
        </div>

        <div>
          <Input
            placeholder="Quantidade"
            className="w-[150px]"
            {...register("amount")}
            onInput={() => handleAttTotalPrice()}
          />
          <span className="text-sm text-rose-500 pl-1">
            {errors.amount && errors.amount.message}
          </span>
        </div>

        <div>
          <Controller
            control={control}
            name="units"
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
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
              );
            }}
          />

          <span className="text-sm text-rose-500 pl-1 break-words">
            {errors.units && errors.units.message}
          </span>
        </div>

        <div>
          <Input
            placeholder="Valor unitário"
            className="w-[150px]"
            {...register("unitPrice")}
            onInput={() => handleAttTotalPrice()}
          />
          <span className="text-sm text-rose-500 pl-1">
            {errors.unitPrice && errors.unitPrice.message}
          </span>
        </div>

        <Input
          type="text"
          placeholder="Valor total"
          className="w-[150px]"
          {...register("totalPrice")}
          value={getValues("totalPrice")}
          disabled
        />

        <Button type="submit" variant={"default"}>
          Adicionar
        </Button>
      </form>
  );
}
