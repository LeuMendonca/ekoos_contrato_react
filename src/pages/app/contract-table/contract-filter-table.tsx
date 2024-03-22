import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";

interface SearchContractProps{
    queryContract?: string | number
}

export function ContractFilterTable(){

    const { register , handleSubmit } = useForm()

    function handleSearchContract( data: SearchContractProps ){
        console.log(data)
    }

    return(
        <form className="pt-4 pb-2 flex flex-row gap-2" onSubmit={ handleSubmit(handleSearchContract)}>
            <Input 
                placeholder="Filtre por um contrato ou cliente" 
                className="w-[40%] focus:outline-none focus:shadow rounded "
                {...register('queryContract')}
            />

            <Button 
                type="submit"
                variant="outline" 
                className="flex flex-row justify-center items-center gap-2 rounded">
                <Search className="w-4 h-4"/>
                Filtrar
            </Button>
        </form>
    )
}