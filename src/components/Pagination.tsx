import { Button } from "./ui/button"

interface PaginationProps{
    setCurrencyPage: ( num: number) => void
    totalPages: number
    currencyPage: number
}

export function Pagination({setCurrencyPage , totalPages , currencyPage}: PaginationProps ) {
   
  return (
    <div className="flex flex-row gap-1 mt-2 w-full justify-center">
        <Button 
            className="text-white"
            onClick={() => setCurrencyPage(0)}
        >
            Primeira
        </Button>

                { Array(totalPages).fill('').map((_, index  ) => {
                    const indexPageCurrency = index + 1 
                    return (
                        <Button 
                            className={ 
                                index === currencyPage ? "bg-zinc-600 hover:bg-zinc-600 text-white" :  
                                indexPageCurrency  > currencyPage + 2 || indexPageCurrency < currencyPage  ? "hidden" : ''
                                + 'text-white'
                            } 
                            onClick={() => setCurrencyPage( index )}  
                            key={index}
                        >
                                { indexPageCurrency}
                        </Button>
                    )
                })}
                
        <Button 
            onClick={() => setCurrencyPage(totalPages - 1)}
            className="text-white"
        >
            Ultima
        </Button>
    </div>
  )
}
