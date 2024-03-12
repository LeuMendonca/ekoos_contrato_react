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
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosError } from "axios";

export function Index(){
    
    const [ queryContract , setQueryContract ] = useState<string | number>('')
    const [ contracts , setContracts ] = useState([])

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
        try{
            const responseDelete = await api.delete('delete-contract/' + seq_contrato)
            console.log(responseDelete)
    
            if( responseDelete.status === 200) {
                getContracts()
    
                toast.success(`${ responseDelete.data.message }`,{
                    autoClose: 2000
                })
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                
                const mensageError = axiosError.response?.data.message 

                toast.error(`${mensageError}`, {
                    autoClose: 2000
                });
            } else {
                // É outro tipo de erro
                console.error('Erro:', error.message);
            }
        }
    }

    async function closeContract(seq_contrato:number) {
        try {
            const responseClose = await api.put(`close-contract/${seq_contrato}`);
            console.log("Response:", responseClose);
    
            if (responseClose.status === 200) {
                console.log(responseClose.data)
                getContracts();
                toast.success(`${responseClose.data.message}`, {
                    autoClose: 2000
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                
                const mensageError = axiosError.response?.data.message 

                toast.error(`${mensageError}`, {
                    autoClose: 2000
                });
            } else {
                // É outro tipo de erro
                console.error('Erro:', error.message);
            }
        }
    }

    async function generatedInvoice( seq_contrato:number ){
        try{
            const responseInvoice = await api.post('generate-invoice/' + seq_contrato)

            if( responseInvoice.status === 200) {
                getContracts()

                toast.success(`${ responseInvoice.data.message }`,{
                    autoClose: 2000
                })
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                
                const mensageError = axiosError.response?.data.message 

                toast.error(`${mensageError}`, {
                    autoClose: 2000
                });
            } else {
                // É outro tipo de erro
                console.error('Erro:', error.message);
            }
        }
    }

    async function generatedServiceInvoice(seq_contrato:number){
        try{
            const responseServiceInvoice = await api.post('generated-service-invoice/' + seq_contrato)

            if( responseServiceInvoice.status === 200){
                toast.success(`${responseServiceInvoice.data.message}`,{
                    autoClose: 2000
                })
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                
                const mensageError = axiosError.response?.data.message 

                toast.error(`${mensageError}`, {
                    autoClose: 2000
                });
            } else {
                // É outro tipo de erro
                console.error('Erro:', error.message);
            }
        }
    }

    async function printContract(seq_contrato:number) {
        try {
            const response = await axios.get(`http://localhost:8001/api/print-contract/${seq_contrato}`, {
                responseType: 'blob' // Informa ao Axios para esperar uma resposta de tipo blob
            });
    
            // Cria um blob URL para o PDF retornado
            const blobUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            
            // Abre o PDF em uma nova janela
            window.open(blobUrl, '_blank');
        } catch (error) {
            console.error('Erro ao imprimir contrato:', error);
            // Trate o erro conforme necessário
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
                    className="w-[40%] focus:outline-none focus:shadow rounded flex-1"
                    value={queryContract}
                    onChange={( e ) => setQueryContract(e.target.value)}
                />
            </div>

            <Table className="border rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableCell className="w-[100px] text-center font-bold">Sequencial</TableCell>
                        <TableCell className="w-[100px] text-center font-bold">Código</TableCell>
                        <TableCell className="flex-1 font-bold">Nome</TableCell>
                        <TableCell className="w-[160px] text-center font-bold">Valor do Contrato</TableCell>
                        <TableCell className="w-[160px] text-center font-bold">Data Inicial</TableCell>
                        <TableCell className="w-[160px] text-center font-bold">Data Final</TableCell>
                        <TableCell className="w-[160px] text-center font-bold">Ações</TableCell>
                    </TableRow>
                </TableHeader>
                
                <TableBody className="h-6 ">
                    { contracts.map( contract => 
                        <ContractTableRow 
                            contract={contract} 
                            deleteContract={deleteContract} 
                            closeContract={closeContract}
                            generatedInvoice={generatedInvoice}
                            generatedServiceInvoice={generatedServiceInvoice}
                            printContract={printContract}
                        /> )}
                </TableBody>
            </Table>
        </main>
    )
}