import { Trash2 } from "lucide-react"
import { Card } from "./ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHeader, TableRow } from "./ui/table"
import { ProductsProps } from "../pages/app/register/RegisterContract"

interface TableProductsProps{
    shoppingCart: ProductsProps[]
    totalPriceContract: number
    deleteItemShoppingCart: ( seq_contrato:number ) => void
}

export function TableProducts({shoppingCart , totalPriceContract ,deleteItemShoppingCart }:TableProductsProps) {

  return (
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
  )
}
