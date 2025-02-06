import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './pages/AddItems/AddItems';
import List from './pages/ListItems/ListItems';
import Orders from './pages/Orders/Orders';
import Read from './pages/ReadSingleItem/Read';
import EditItem from './pages/EditItem/EditItem';

const App = () => {
  return (
    <div>
    <ToastContainer />
    <Navbar />
    <hr />
    <div className="app-content">
      <Sidebar />
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/list" element={<List />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/read/:id" element={<Read/>} />
        <Route path="/edit/:id" element={<EditItem/>} />

      </Routes>
    </div>
  </div>
  )
}

export default App
