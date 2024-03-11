import { Button } from "../../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { TableCell, TableRow } from "../../../components/ui/table";
import { api } from "../../../services/Axios";

interface ContractProps {
    seq_contrato: number
    cod_pessoa: number
    name: string
    currencyContract: number
    dateStart: string
    dateEnd: string
}

interface TableContractProps{
    contract: ContractProps,
    deleteContract: ( seq_contrato:number ) => void
}

export function ContractTableRow( { contract , deleteContract }:TableContractProps  ) {
    return (
        <TableRow>
            <TableCell className="text-center">{contract.seq_contrato}</TableCell>
            <TableCell className="text-center">{contract.cod_pessoa}</TableCell>
            <TableCell className="font-semibold">{contract.name}</TableCell>
            <TableCell className="text-center">R$ {contract.currencyContract}</TableCell>
            <TableCell className="text-center">{contract.dateStart}</TableCell>
            <TableCell className="text-center">{contract.dateEnd}</TableCell>
            <TableCell>
                <div className="flex flex-row gap-2 justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button  variant={"outline"}>Ações</Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem>Atualizar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteContract(contract.seq_contrato)}>Excluir</DropdownMenuItem>
                            <DropdownMenuItem>Concluir</DropdownMenuItem>
                            <DropdownMenuItem>Imprimir</DropdownMenuItem>
                            <DropdownMenuItem>Nota remessa</DropdownMenuItem>
                            <DropdownMenuItem>Nota serviço</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </TableCell>
        </TableRow>
    )
}