import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { api } from "../../../services/Axios";
import { useContext, useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useAuth } from "../../../context/useAuth";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginSubmitProps {
  user: string
  password: string
  company: string
}

interface CompanyProps {
  value: string
  label: string
}

const FormLoginSchema = z.object({
  user: z.string().min(1,"Insira o seu usuário."),
  password: z.string().min(1,"Insira sua senha."),
  company: z.string({
    required_error: "Selecione uma empresa"
  }).min(1,"Selecione uma empresa.")
})

type LoginType = z.infer<typeof FormLoginSchema>

export function Login() {

  const { handleSubmit , register , control , formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(FormLoginSchema)
  })

  const [ company , setCompany ] = useState<CompanyProps[]>([])
  const { setUserLocalStorage  } = useContext(useAuth)

  async function handleSubmithingLogin( data:LoginSubmitProps ){
    try{
      const responseUser = await api.get('auth', {
        params: {
          user: data.user,
          password: data.password,
          company: data.company
        }
      })

      if( responseUser.status == 200){
        toast.success(`${responseUser.data.message}`,{
            autoClose: 1000
        })

        setUserLocalStorage(responseUser.data.data)
        console.log(responseUser.data.data)

        setInterval(() => window.location.href = "/index" , 2000)
    }
}catch(error: any){
    if (axios.isAxiosError(error)) {
        const axiosError: any = error as AxiosError;

        const mensageError = axiosError.response.data.message

        toast.error(`${mensageError}`, {
            autoClose: 2000
        });
    } else {
        // É outro tipo de erro
        console.error('Erro:', error.message);
    }
}
  }

  async function getCompany(){
    const responseCompany = await api.get('empresas')
    setCompany(responseCompany.data)
  }

  useEffect(() => {
    getCompany();
  },[])

  return (
      <main className="h-screen w-screen flex flex-row ">
        <section className="w-[50%] bg-slate-200 h-[100%] p-4 flex flex-col items-center justify-center bg-[url('./static/contrato.png')] bg-cover bg-center bg-blend-luminosity flex-1">
          <div className="-translate-y-3/4 antialiased">
              <p className="text-7xl text-bg-gray-700">
                EkoOS Contratos
              </p>

              <p className="text-3xl w-[350px] mt-5 text-bg-gray-700">
                Uma maior segurança para o seu negócio.
              </p>
          </div>
        </section>

        <section className="w-[50%] h-[100%] flex flex-col justify-center items-center bg-slate-300 flex-1">
          <form className="h-3/4 w-3/4 p-5  bg-slate-200 relative" onSubmit={handleSubmit(handleSubmithingLogin)}>

            <div className="w-full flex flex-col items-center translate-y-1/4">
              <h2 className="text-3xl text-black">
                Login
              </h2>

              <div className="w-full flex flex-col items-center justify-center mt-10 gap-0.5 ">

                <div className="w-full flex-col flex justify-center items-center order">
                  { errors.user &&
                    <span className="text-rose-500 self-start text-sm font-medium ml-[12.5%]">
                    {errors.user && errors.user.message}
                  </span>
                  }
                  <Input
                    {...register('user')}
                    className="bg-gray-700 text-white rounded-sm placeholder:text-white w-3/4 focus:rounded-none" 
                    placeholder="Digite o seu usuário"/>
                    
                </div>

                <div className="w-full flex-col flex justify-center items-center">
                  
                    {
                      errors.password &&
                      <span className="text-rose-500 self-start text-sm font-medium ml-[12.5%]">
                        {errors.password && errors.password.message}
                      </span>
                    }

                  <Input
                    type="password"
                    { ...register('password') }
                    className="bg-gray-700 text-white rounded-sm placeholder:text-white w-3/4" 
                    placeholder="Digite a sua senha"/>
                </div>

                <div className="w-full flex-col flex justify-center items-center">
                  {errors.company &&
                    <span className="text-rose-500 self-start text-sm font-medium ml-[12.5%]">{errors.company && errors.company.message}</span>
                  }
                  <Controller
                    name={"company"}
                    control={control}
                    render={ ({field:{onChange}}) => {
                      return(
                        <Select onValueChange={onChange}>
                          <SelectTrigger className="w-3/4 bg-gray-700 text-white rounded-sm">
                            <SelectValue placeholder="Selecione a empresa"/>
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 text-white">
                            <SelectGroup>
                              {company.map( company => (
                                <SelectItem value={company.value}>{company.label}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        )
                    }}
                  />
                </div>
              </div> 

              <Button type="submit" className="w-1/3 mt-3 self-end -translate-x-[37%] text-white">
                Login
              </Button>
            </div>

            <footer className="absolute flex flex-col items-center w-full gap-3 bottom-0 mb-5 text-black">
              <p>Conheça nossos serviços acessando o nosso <a href="https://ekoos.com.br" className="text-sky-800" target="_blank">site</a>.</p>
              <p>Desenvolvido por &copy;EkoOS - { new Date().getFullYear() }</p>
            </footer>
          </form>
        </section>
      </main>
  )
}