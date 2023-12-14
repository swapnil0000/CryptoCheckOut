import { ThemeProvider, createTheme } from '@mui/material/styles';
import styled from '@emotion/styled'
import { AppBar, Container, MenuItem, Select, Toolbar, Typography} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../cryptoSlice';
const Header = () => {
    const { currency } = useSelector((state) => state.crypto);
    console.log(currency)
    const dispatch = useDispatch();
  
    const handleCurrencyChange = (newCurrency) => {
      dispatch(setCurrency(newCurrency));
    }
    const navigate=useNavigate();

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:'#fff',
            },
            type:'dark',
        },
    })

    const TypoStyle=styled(Typography)({
      flex:1,
      color:'gold',
      fontFamily:"Montserrat",
      fontWeight:'bold',
      cursor:"pointer",
      fontSize:'20px'
    })

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
      <Container>
       <Toolbar>
        <TypoStyle onClick={()=>navigate("/")} >
         Crypto Hunter
        </TypoStyle>

        <Select 
         value={currency}       
         onChange={(e)=>handleCurrencyChange(e.target.value)}
         variant='outlined' sx={{width:100,height:40,color:'black',backgroundColor:'white',boxShadow:'none',border:'none'}}>
         <MenuItem value={"USD"}>USD</MenuItem>
         <MenuItem  value={"INR"}>INR</MenuItem>
        </Select>
        
       </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header

// ExampleComponent.js
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCurrency } from '../cryptoSlice';

// const Header = () => {
//   const dispatch = useDispatch();
//   const { currency, symbol } = useSelector((state) => state.crypto);

//   const handleCurrencyChange = (newCurrency) => {
//     dispatch(setCurrency(newCurrency));
//   };

//   return (
//     <div>
//       <p>Current Currency: {currency}</p>
//       <p>Current Symbol: {symbol}</p>
//       <button onClick={() => handleCurrencyChange('INR')}>Change to INR</button>
//       <button onClick={() => handleCurrencyChange('USD')}>Change to USD</button>
//     </div>
//   );
// };



