import { FilePlus2, Home, LogOut, ReceiptText, User } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./themes/mode-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { api } from "../services/Axios";

interface Company{
    label: string 
    value: string
}

export function Header(){

    const { user , getUserLocalStorage , deleteUserLocalStorage , setUserLocalStorage } = useContext(useAuth)
    const [ companies , setCompanies ] = useState<Company[]>([])

    async function getCompany(){
        const responseCompany = await api.get('empresas')
            setCompanies(responseCompany.data)
        }
    
      useEffect(() => {
        getCompany();
      },[])

    function alterCompany( cod: string ){
        const userLS = getUserLocalStorage()
        userLS.company = +cod

        setUserLocalStorage(userLS) // Parei nessa parte fazendo alteração da empresa
    }

    // Este componente aparece em todas as páginas, logo , o useEffect abaixo faz efeito em todas as pastas
    useEffect(() => {
        getUserLocalStorage();
    },[])

    console.log( companies )
    return(
        <> 
            { user && 
                <header className="flex h-16 items-center gap-6 px-6 border-b">
                    <Link to={"/index"} className="text-xl font-medium flex items-center justify-center gap-2 cursor-pointer hover:text-primary">
                        <ReceiptText className="w-6 h-6"/>
                        EkoOS Contratos
                    </Link>

                    <Separator orientation="vertical" className="h-8"/>

                    <nav className="flex flex-row">
                        <Link to={'/index'} className="flex flex-col items-center cursor-pointer hover:text-primary">
                            <Home />
                            Home
                        </Link>
                    </nav>
                    
                    <div className="flex items-center gap-3 ml-auto">

                        {/* <span className="flex flex-row gap-1 text-md font-medium border-b-[1px] border-primary pb-1 mt-1">
                            <RefreshCcw className="w-4 h-4 self-center"/> 
                            {user.company} - { user.nameCompany }
                        </span> */}

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant={"outline"} className="duration-500 hover:text-black">
                                    <span className="flex items-center justify-center gap-1">
                                        { user.nameCompany }
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                { companies.map(company => (
                                    company.value != user.company && 
                                        <DropdownMenuItem 
                                            className="cursor-pointer"
                                            onClick={() => alterCompany(company.value)}>{ company.label }</DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <ModeToggle/>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button  variant={"default"} className="text-white duration-500 hover:text-black">
                                    <span className="flex items-center justify-center gap-1">
                                        <User className="w-4 h-4"/> { user.user === '1'? "Suporte EkoOS" : user.user}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link to={"/register"} className="flex items-center justify-center gap-1">
                                        <FilePlus2 className="w-4 h-4"/>     
                                        Novo contrato   
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => deleteUserLocalStorage()}>
                                    <a href="" className="flex items-center justify-center gap-1 text-rose-500">
                                        <LogOut className="w-4 h-4"/>
                                        Sair
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>


            }
        </>
    )
}