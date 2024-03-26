import { Button } from "../../../components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import { TableCell, TableRow } from "../../../components/ui/table";
import { NavLink } from "react-router-dom";
import { api } from "../../../services/Axios";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

interface ContractProps {
    seq_contrato: number
    cod_pessoa: number
    name: string
    currencyContract: number
    dateStart: string
    dateEnd: string
    vencido: boolean
}

interface TableContractProps{
    contract: ContractProps,
    getContracts: () => void
    // deleteContract: ( seq_contrato:number ) => void
    // closeContract: ( seq_contrato:number ) => void
    // generatedInvoice: ( seq_contrato:number ) => void
    // generatedServiceInvoice: ( seq_contrato:number ) => void
    // printContract: ( seq_contrato:number ) => void
}

export function ContractTableRow( { contract , getContracts }:TableContractProps  ) {
    

    async function deleteContract(seq_contrato:number){
        
        try{
            const responseDelete = await api.delete('delete-contract/' + seq_contrato)
    
            if( responseDelete.status === 200) {
                getContracts()
    
                toast.success(`${ responseDelete.data.message }`,{
                    autoClose: 2000
                })
            }
        }catch(error: any ){
            if (axios.isAxiosError(error)) {
                const axiosError:any = error as AxiosError;
                
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
    
            if (responseClose.status === 200) {
                getContracts();
                toast.success(`${responseClose.data.message}`, {
                    autoClose: 2000
                });
            }
        } catch (error: any ) {
            if (axios.isAxiosError(error)) {
                const axiosError:any = error as AxiosError;
                
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
    return (
        <TableRow className={contract.vencido ? ( 'text-rose-500' ) : ('')}>
            <TableCell className="text-center">{contract.seq_contrato}</TableCell>
            <TableCell className="text-center">{contract.cod_pessoa}</TableCell>
            <TableCell className="font-semibold">{contract.name}</TableCell>
            <TableCell className="text-center">{contract.currencyContract.toLocaleString('pt-br', {style: 'currency' , currency: 'brl'})}</TableCell>
            <TableCell className="text-center">{contract.dateStart}</TableCell>
            <TableCell className="text-center">{contract.dateEnd}</TableCell>
            <TableCell>
                <div className="flex flex-row gap-2 justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button  variant={"warning"}>Ações</Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem><NavLink to={`/update/${contract.seq_contrato}`}>Atualizar</NavLink></DropdownMenuItem>
                            <DropdownMenuItem onClick={() => closeContract(contract.seq_contrato)}>Concluir</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteContract(contract.seq_contrato)}>Excluir</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => printContract(contract.seq_contrato)}>Imprimir</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </TableCell>
        </TableRow>
    )
}