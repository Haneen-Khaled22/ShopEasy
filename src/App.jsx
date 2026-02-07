
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import About from './components/About/About'
import Products from './components/Products/Products'
import CategoriesComponent from './components/Categories/Categories'



function App() {
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {index:true,element:<Home/>},
         {path:'/products',element:<Products/>}, 
         {path:'/contact',element:<Contact/>},
         {path:'/about',element:<About/>},
        {path:'/category',element:<CategoriesComponent/>}
      ]
    }
  ])

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
