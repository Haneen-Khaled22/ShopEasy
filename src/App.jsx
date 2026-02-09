
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import About from './components/About/About'
import Products from './components/Products/Products'
import CategoriesComponent from './components/Categories/Categories'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import Cart from './components/Cart/Cart'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'



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
         {path:'/cart',element:<Cart/>},
        {path:'/category',element:<CategoriesComponent/>},
                {path:'/category/:slug',element:<CategoryDetails/>}

      ]
    }
  ])

  return (
    <>
    <Provider store={store}>

   
     <RouterProvider router={router}/>
      </Provider>
    </>
  )
}

export default App
