import { RouterProvider } from "react-router-dom"
import { Router } from "./routes/routes"
import './globals.css'
import { ThemeProvider } from "./components/themes/theme-provider"

function App() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={Router}/>
    </ThemeProvider>
      
    </>
  )
}

export default App
