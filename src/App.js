import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Coin from "./Pages/Coin";
import styled from "@emotion/styled";
import CryptoContext from "./CryptoContext";
function App() {

  const Style = styled('div')({
    backgroundColor:'#14161a',
    color:'white',
    height:'100%'
  })
  return (
    <CryptoContext>
    <BrowserRouter>
     <Style>
      <Header/>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/coins/:id" element={<Coin/>}/>
      </Routes>
     </Style>
    </BrowserRouter>
    </CryptoContext>
  );
}

export default App;
