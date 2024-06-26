import { Route, Routes } from "react-router-dom";

import Home from "./components/home/Home";
import Items from "./components/items/Items"
import Cart from "./components/cart/Cart";
import Final from "./components/final/Final";
import Login from "./components/login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/final" element={<Final/>}/>
      <Route path="/items/:category" element={<Items/>}/>
    </Routes>
  );
}

export default App;
