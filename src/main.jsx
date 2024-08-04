import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import Home from './Home.jsx'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import Registration from './Pages/Registration'
import LoginForm from './Pages/LoginForm'
import AddHostel from './Pages/AddPost'
import MyHostels from './Pages/myhostel'
import DetailPage from './Pages/DetailPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<Layout/>}>
    <Route path='/' element={<Home/>} />
    <Route path='/Signup' element={<Registration/>} />
    <Route path='/login' element={<LoginForm/>} />
    <Route path='/add-hostel' element={<AddHostel/>} />
    <Route path='/my-hostels' element={<MyHostels/>} />
    <Route path="/hostel/:id" element={<DetailPage/>} />
    </Route>
  )
 )

ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
