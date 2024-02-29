import { Table, TableHeader, TableCell, TableRow, TableBody } from "../../components/ui/table";
import { ContractFilterTable } from "./contract/contract-filter-table";
import { ContractTableRow } from "./contract/contract-table-row";

const contracts = [
    { 
        seq_contrato: 20,
        cod_pessoa: 100,
        name: "Leonardo Mendonça",
        currencyContract: 300,
        dateStart: '01/01/2024',
        dateEnd: '30/04/2024'
    },
    { 
        seq_contrato: 21,
        cod_pessoa: 153,
        name: "Ana Luiza Parreira",
        currencyContract: 362,
        dateStart: '01/01/2024',
        dateEnd: '30/04/2024'
    },
    { 
        seq_contrato: 22,
        cod_pessoa: 165,
        name: "Carneirão Cristian",
        currencyContract: 392,
        dateStart: '01/01/2024',
        dateEnd: '30/04/2024'
    }
]

export function Index(){
    return(
        <main className="p-2">

            <ContractFilterTable/>

            <Table className="border rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableCell className="w-[100px] text-center">Sequencial</TableCell>
                        <TableCell className="w-[100px] text-center">Código</TableCell>
                        <TableCell className="flex-1">Nome</TableCell>
                        <TableCell className="w-[160px] text-center">Valor do Contrato</TableCell>
                        <TableCell className="w-[160px] text-center">Data Inicial</TableCell>
                        <TableCell className="w-[160px] text-center">Data Final</TableCell>
                        <TableCell className="w-[160px] text-center">Ações</TableCell>
                    </TableRow>
                </TableHeader>
                
                <TableBody className="h-6 ">
                    { contracts.map( contract => <ContractTableRow contract={contract}/> )}
                </TableBody>
            </Table>
        </main>
    )
}