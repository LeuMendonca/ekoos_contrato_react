import { RouterProvider } from "react-router-dom"
import { Router } from "./routes/routes"
import './globals.css'
import { ThemeProvider } from "./components/themes/theme-provider"
import { ToastContainer } from 'react-toastify'
import { UseAuthentication } from "./context/useAuth"


function App() {

  return (
    <>
    <UseAuthentication>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={Router}/>

          <ToastContainer/>
        </ThemeProvider>
    </UseAuthentication>
    </>
  )
}

export default App
