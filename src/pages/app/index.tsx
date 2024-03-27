import { useContext, useEffect, useState } from "react";
import { Table, TableHeader, TableCell, TableRow, TableBody } from "../../components/ui/table";
import { ContractTableRow } from "./contract-table/contract-table-row";
import { api } from "../../services/Axios";
import { Input } from "../../components/ui/input";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/useAuth";
import { Pagination } from "../../components/Pagination";
import { Link } from "react-router-dom";
import { Square } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export function Index(){
    
    const [ queryContract , setQueryContract ] = useState<string | number>('')
    const [ contracts , setContracts ] = useState([])
    const { user , getUserLocalStorage } = useContext( useAuth )
    const [ visibleLabel , setVisibleLabel ] = useState(false)

    // Paginação
    const [ totalPages , setTotalPages ] = useState(0)
    const [ currencyPage , setCurrencyPage ] = useState(0)

    // Funções
    async function getContracts(){
        const user = getUserLocalStorage()

        const contracts = await api.get('contratos',{
            params: {
                query: queryContract,
                offset: ( currencyPage ) * 10,
                num_empresa: user.company
                
            }
        })

        const contractsList = JSON.parse(contracts.data)
        setContracts(contractsList["listContratos"])
        setTotalPages(contractsList["paginationContracts"]["totalPages"])
    }

    function handleVisibleLabel(){
        setVisibleLabel(state => !state)
    }
    
    useEffect( () => {
        getContracts();
    },[ queryContract , currencyPage ])

    return(
        <>
            { (user && contracts.length > 0 ) ? 
                <main className="p-2 px-5">

                    <div className="pt-4 pb-2 flex flex-row gap-2">
                        <Input 
                            placeholder="Filtre por um cliente" 
                            className="w-[40%] focus:outline-none focus:shadow rounded flex-1"
                            value={queryContract}
                            onChange={( e ) => setQueryContract(e.target.value)}
                        />
                    </div>

                    <Table className="border relative">
                        <div className="absolute right-0 top-0">
                            <Button 
                                variant={"link"}
                                className="h-7 w-3 relative text-rose-500"
                                // className="h-7 w-3 relative bg-rose-400 hover:bg-rose-500"
                                onMouseEnter={() => handleVisibleLabel()}
                                onMouseOut={() => handleVisibleLabel()}
                            >
                                ?
                            </Button>

                            { visibleLabel &&
                                <Card className="whitespace-nowrap p-5 absolute mt-1 opacity-95 right-0">
                                    <span className="font-medium">
                                        Rótulo
                                    </span>

                                    <span className="flex flex-row gap-1 mt-2">
                                        <Square className="fill-rose-500 w-5 h-5" strokeWidth={0}/>
                                        Vencidos
                                    </span>

                                    <span className="flex flex-row gap-1">
                                        <Square className="fill-black w-5 h-5" strokeWidth={0}/>
                                        Em andamento
                                    </span>
                             </Card>
                            }
                        </div>

                        <TableHeader>
                            <TableRow>
                                <TableCell className="w-[100px] text-center font-bold">Sequencial</TableCell>
                                <TableCell className="w-[100px] text-center font-bold whitespace-nowrap">Código do Cliente</TableCell>
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
                                    getContracts={getContracts}
                                /> )}
                        </TableBody>
                    </Table>

                    
                    { contracts.length > 0 &&
                        <Pagination setCurrencyPage={setCurrencyPage} totalPages={totalPages} currencyPage={currencyPage}/>    
                    }
                    
                </main>
                :
                <div className="p-4 text-center mt-10">
                    <h3 className="font-medium text-3xl">Nenhum contrato foi encontrado.</h3>
                    <p className="mt-2">Para gerar um novo contrato <Link to={"/register"} className="text-rose-500">clique aqui</Link></p>
                </div>
            }
        </> 
    )
}