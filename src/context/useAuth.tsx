import { ReactNode, createContext, useState } from "react";

interface UseAuthenticationProps{
    children: ReactNode
}

export interface UserLoginProps{
    name: string
    password: string
    company: string
    nameCompany: string
}

export interface UserLocalStorageProps {
    name: string
    codUser: number
    company: string
    nameCompany: string
}

interface useAuthProps{
    user: any
    getUserLocalStorage: () => any 
    setUserLocalStorage: ( user: UserLoginProps ) => void
    deleteUserLocalStorage: () => void
}

export const useAuth = createContext({} as useAuthProps)

export function UseAuthentication({ children }:UseAuthenticationProps){

    const [ user , setUser ] = useState<UserLocalStorageProps>()

    async function setUserLocalStorage(user:UserLoginProps){


        const dataUser = JSON.stringify({
            user: user.name,
            company: user.company,
            nameCompany: user.nameCompany,
        })

        window.localStorage.setItem('@ekoos_contratos: usuario' , dataUser )

    }

    function getUserLocalStorage(){
        const userLocalStorage = window.localStorage.getItem('@ekoos_contratos: usuario')
        if(userLocalStorage){
            setUser(JSON.parse(userLocalStorage!))
            return  JSON.parse(userLocalStorage!)
        }else{
            window.location.href = '/login'
        }
    }

    function deleteUserLocalStorage(){
        window.localStorage.removeItem('@ekoos_contratos: usuario')
        window.location.href = '/login'
    }

    return(
        <useAuth.Provider value={{ setUserLocalStorage , getUserLocalStorage , user , deleteUserLocalStorage }}>
            { children }
        </useAuth.Provider>
    )
}