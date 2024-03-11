import { useEffect, useState } from "react";
import { Table, TableHeader, TableCell, TableRow, TableBody } from "../../components/ui/table";
import { ContractFilterTable } from "./contract/contract-filter-table";
import { ContractTableRow } from "./contract/contract-table-row";
import { api } from "../../services/Axios";

export function Index(){
    
    const [ contracts , setContracts ] = useState([])

    async function getContracts(){
        const contracts = await api.get('contratos')
        setContracts(contracts.data)
    }

    useEffect( () => {
        getContracts();
    },[])
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