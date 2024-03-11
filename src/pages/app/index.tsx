import { useEffect, useState } from "react";
import { Table, TableHeader, TableCell, TableRow, TableBody } from "../../components/ui/table";
import { ContractFilterTable } from "./contract/contract-filter-table";
import { ContractTableRow } from "./contract/contract-table-row";
import { api } from "../../services/Axios";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

export function Index(){
    
    const [ queryContract , setQueryContract ] = useState<string | number>('')
    const [ contracts , setContracts ] = useState([])

    function handleSearchContract( data: string | number ){
        console.log(data)
    }

    // Requisições API
    async function getContracts(){
        const contracts = await api.get('contratos',{
            params: {
                query: queryContract
            }
        })

        setContracts(contracts.data)
    }

    async function deleteContract(seq_contrato:number){
        const responseDelete = await api.delete('delete-contract/' + seq_contrato)
        console.log(responseDelete)

        if( responseDelete.status === 200) {
            getContracts()

            toast.success(`${ responseDelete.data.message }`,{
                autoClose: 2000
            })
        }
    }

    useEffect( () => {
        getContracts();
    },[queryContract])
    return(
        <main className="p-2">

            <div className="pt-4 pb-2 flex flex-row gap-2">
                <Input 
                    placeholder="Filtre por um contrato ou cliente" 
                    className="w-[40%] focus:outline-none focus:shadow rounded "
                    value={queryContract}
                    onChange={( e ) => setQueryContract(e.target.value)}
                />

                <Button 
                    type="submit"
                    variant="outline" 
                    className="flex flex-row justify-center items-center gap-2 rounded"
                    onClick={() => handleSearchContract(queryContract)}>
                    <Search className="w-4 h-4"/>
                    Filtrar
                </Button>
            </div>

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
                    { contracts.map( contract => <ContractTableRow contract={contract} deleteContract={deleteContract}/> )}
                </TableBody>
            </Table>
        </main>
    )
}