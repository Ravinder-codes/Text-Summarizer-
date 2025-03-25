import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from "./components/Home"
import Login from './components/Login'
function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Home />,
    },
  ]);
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
