import { FilePlus2, Home, LogOut, ReceiptText, User } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./themes/mode-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header(){
    return(
        <header className="flex h-16 items-center gap-6 px-6 border-b">

            {/* <ReceiptText className="w-7 h-7"/> */}
            <Link to={"/"} className="text-xl font-medium flex items-center justify-center gap-2 cursor-pointer hover:text-blue-600">
                <ReceiptText className="w-6 h-6"/>
                EkoOS Contratos
            </Link>
            <Separator orientation="vertical" className="h-8"/>

            <nav className="flex flex-row">
                <Link to={'/'} className="flex flex-col items-center">
                    <Home/>
                    Home
                </Link>
            </nav>

            <div className="flex items-center gap-3 ml-auto">
                <ModeToggle/>
                <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button  variant={"outline"}>
                                <span className="flex items-center justify-center gap-1">
                                    <User className="w-4 h-4"/> Suporte EkoOS
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

                            <DropdownMenuItem>
                                <span className="flex items-center justify-center gap-1 text-rose-500">
                                    <LogOut className="w-4 h-4"/>
                                    Sair
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
            </div>
        </header>      
    )
}