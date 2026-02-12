
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
import ProductsDetails from './components/ProductDetails/ProductsDetails'
import CategorySections from './components/All Categories/CategorySections'
import CategoryProducts from './components/CategoryProducts/CategoryProducts'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Checkout from './components/Checkout/Checkout'



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
        {path:'/category/:slug',element:<CategoryProducts/>},
                {path:'/categories',element:<CategorySections/>},

        {path:'/product/:id',element:<ProductsDetails/>},
                 {path:'/checkout',element:<Checkout/>},


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
