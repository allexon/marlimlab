import { Route, Routes } from 'react-router-dom'

import Home from './app/business/home/Home'
import Client from './app/business/client/Client'
import User from './app/business/user/User'
import Login from './app/business/login/Login'
import Company from './app/business/company/Company'
import Address from './app/business/address/Address'
import Product from './app/business/product/Product'
import Map from './app/business/map/Map'
import { Message } from './app/default/index'

// observaçao por algum motivo eu só consigo inciar Message() nas rotas
export default function Routers() {
  return (
    <>
    {Message()} 
    <Routes>      
      <Route path='/' element={<Home />} />
      <Route path='/user' element={<User />} />
      <Route path='/client' element={<Client />} />
      <Route path='/myData' element={<Client />} />
      <Route path='/login' element={<Login />} />
      <Route path='/company' element={<Company />} />
      <Route path='/address' element={<Address />} />
      <Route path='/product' element={<Product />} />
      <Route path='/map' element={<Map />} />      
    </Routes>    
    </>
  )
}