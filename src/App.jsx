import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Products from "./components/Products/Products";
import CategoriesComponent from "./components/Categories/Categories";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Cart from "./components/Cart/Cart";
import ProductsDetails from "./components/ProductDetails/ProductsDetails";
import CategorySections from "./components/All Categories/CategorySections";
import CategoryProducts from "./components/CategoryProducts/CategoryProducts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Checkout from "./components/Checkout/Checkout";
import { SnackbarProvider } from "notistack";
import WishList from "./components/WishList/WishList";
import Login from "./components/Login/Login";
import Register from "./components/Rejester/Rejester";
import { ThemeProvider } from "./Context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/products", element: <Products /> },
        { path: "/contact", element: <Contact /> },
        { path: "/about", element: <About /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <WishList /> },
        { path: "/category", element: <CategoriesComponent /> },
        { path: "/category/:slug", element: <CategoryProducts /> },
        { path: "/categories", element: <CategorySections /> },

        { path: "/product/:id", element: <ProductsDetails /> },
        { path: "/checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      ],
    },
  ]);

  return (
    <>
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
