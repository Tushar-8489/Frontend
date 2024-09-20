import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Nav.jsx";
import './App.css';
import Footer from "./components/Footer.jsx";
import Homepage from "./components/Homepage.jsx";
import Register from "./components/Register.jsx";
import Login from  './components/Login.jsx';
import Cart from './components/Pages/CartPage.jsx';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./components/context/auth.jsx";
import { SearchProvider } from "./components/context/Search.jsx";
import Dashbord from "./components/Dashbord.jsx";
import PrivateRoute from "./components/Private.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import CreateCategory from "./components/CreateCategory.jsx";
import CategoryForm from "./components/form/CategoryForm.jsx";
import CreateProduct from "./components/CreateProduct.jsx";
import AdminProduct from "./components/AdminProduct.jsx";
import UpdateProduct from "./components/UpdateProduct.jsx";
import CategoryProduct from "./components/CategoryProduct.jsx";
import SearchPage from "./components/SearchPage.jsx";
import ProductDetail from "./components/Pages/ProductDetail.jsx";
import UploadPhoto from "./components/UploadPhoto.jsx";
import { CartProvider } from "./components/context/cart.jsx";
import DeletePhoto from "./components/Pages/DeletePhoto.jsx";
import Profile from "./components/Pages/Profile.jsx";





function App() {
  return (
    <div className="main">
    <AuthProvider>
    <SearchProvider>
    <CartProvider>
    <BrowserRouter>
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/product/:slug" element={<ProductDetail/>}/>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/signup" element={<Register/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        <Route path="/user/details" element={<PrivateRoute/>}>
        <Route path="" element={<Dashbord/>}></Route>
        </Route>
        <Route path="/dashboard/products" element={<AdminProduct/>}></Route>
        <Route path="/category" element={<CreateCategory/>}></Route>
        <Route path="/products" element={<CreateProduct/>}></Route>
        <Route path="/photos" element={<UploadPhoto />} />
        <Route path="/dashboard/products/:slug" element={<UpdateProduct/>}></Route>
        <Route path="/product/category/:id" element={<CategoryProduct/>}></Route>
        <Route path="/dashboard/photos" element={<DeletePhoto/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<div><h1>Page Not Found</h1></div>}></Route>
      </Routes>
      <Footer />
      </BrowserRouter>
      </CartProvider>
      </SearchProvider>
      </AuthProvider>
  
    </div>
  )
}

export default App
