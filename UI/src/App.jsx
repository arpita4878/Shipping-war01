import './App.css'
import { Route, Routes } from 'react-router-dom'

//Visitors
import Home from './Component/Visitors/Home/Home'
import About from './Component/Visitors/About/About'
import Register from './Component/Visitors/Register/Register'
import Contact from './Component/Visitors/Contact/Contact'
import Nav from './Component/Visitors/Content/Nav/nav'
import Footer from './Component/Visitors/Footer/Footer'

import Admin from './Component/Admin/AdminHome/Admin';
import ManageUser from './Component/Admin/ManageUser/ManageUser'
import EPAdmin from './Component/Admin/EPAdmin/EPAdmin'
import CPAdmin from './Component/Admin/CPAdmin/CPAdmin'
import AddCategory from './Component/Admin/AddCategory/AddCategory'
import AddSubCategory from './Component/Admin/AddSubCategory/AddSubCategory'
import UpdateCat from './Component/Admin/UpdateCat/UpdateCat'


//User
import Login from './Component/User/Login/Login'
import Logout from './Component/User/Logout/Logout'
import UserHome from  './Component/User/UserHome/UserHome'
import CPUser from './Component/User/CPUser/CPUser'
import EPUser from './Component/User/EPUser/EPUser'
import Search from './Component/User/Search/SearchCategory'
import SearchSubCat from './Component/User/Search/SearchSubCat'
import SearchProduct from './Component/User/Search/SearchProduct'
import MyProduct from './Component/User/MyProduct/MyProduct'
import Bidding from './Component/User/Bidding/Bidding'
import AvailableProduct from './Component/User/AvailableProduct/AvailabeProduct'
import Verifyuser from './Component/User/EmailVerification/Verifyuser'
import AddShippingProduct from './Component/User/AddShippingProduct/AddShippingProduct'
import UpdateSubCat from './Component/Admin/UpdateSubCat/UpdateSubCat'
import ManageProduct from './Component/Admin/ManageProduct/ManageProduct'
import View_bids from './Component/User/View_bids/View_bids'


function App() {
  return (
    <>
    <Nav />

   <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/logout' element={<Logout />}></Route>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/search' element={<Search />}></Route>
      <Route path='/addproduct' element={<AddShippingProduct />}></Route>
      <Route path='/searchsc/:catnm' element={<SearchSubCat />}></Route>
      <Route path='/searchproduct/:subcatnm' element={<SearchProduct />}></Route>
      <Route path='/verify/:vemail' element={<Verifyuser />}></Route>
      <Route path='/myproduct' element={<MyProduct />}></Route>
      <Route path='/bidding/:_id' element={<Bidding />}></Route>
      <Route path='/availableproduct' element={<AvailableProduct />}></Route>
      <Route path='/viewbids/:_id' element={<View_bids />}></Route>


      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/epadmin' element={<EPAdmin />}></Route>
      <Route path='/cpadmin' element={<CPAdmin/>}></Route>
      <Route path='/manageuser' element={<ManageUser/>}></Route>
      <Route path='/addcategory' element={<AddCategory/>}></Route>
      <Route path='/addsubcategory' element={<AddSubCategory/>}></Route>
      <Route path='/updatecategory' element={<UpdateCat/>}></Route>
      <Route path='/updatesubcategory' element={<UpdateSubCat/>}></Route>
      <Route path='/manageproduct' element={<ManageProduct/>}></Route>

      <Route  path='/user' element={<UserHome/>}></Route>
      <Route  path='/cpuser' element={<CPUser/>}></Route>
      <Route  path='/epuser' element={<EPUser/>}></Route>

     </Routes>


     
    </>
  )
}

export default App;
