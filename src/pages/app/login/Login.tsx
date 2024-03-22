import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export function Login() {
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
          <form className="h-3/4 w-3/4 p-5  bg-slate-200 relative">

            <div className="w-full flex flex-col items-center translate-y-2/4">
              <h2 className="text-3xl">Login</h2>

              <div className="w-full flex flex-col items-center mt-10">
                <Input 
                  className="bg-gray-700 text-white rounded-sm placeholder:text-white w-3/4 focus:rounded-none" 
                  placeholder="Digite o seu usuário"/>

                <Input 
                  className="bg-gray-700 text-white rounded-sm placeholder:text-white w-3/4" 
                  placeholder="Digite a sua senha"/>
              </div>

              <Button type="submit" className="w-1/3 mt-3 self-end -translate-x-[38%]">
                Login
              </Button>
            </div>

            <footer className="absolute flex flex-col items-center w-full gap-3 bottom-0 mb-5">
              <p>Conheça nossos serviços acessando o nosso <a href="https://ekoos.com.br" className="text-sky-800" target="_blank">site</a>.</p>
              <p>Desenvolvido por &copy;EkoOS - { new Date().getFullYear() }</p>
            </footer>
          </form>
        </section>
      </main>
  )
}
