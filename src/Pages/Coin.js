import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import CoinInfo from '../Components/Banner/CoinInfo';
import styled from '@emotion/styled';
import { Box, LinearProgress, Typography } from '@mui/material';
import theme from '../theme/Theme';
import parse from 'html-react-parser';
const Coin = () => {


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    const {id}=useParams();
    const [coin,setCoin]=useState()

    const {currency,symbol}=useSelector((state)=>state.crypto)
    const fetchCoin=async()=>{
     const {data}=await axios.get(SingleCoin(id));

     setCoin(data);
    }
    useEffect(()=>{
        fetchCoin();
    },[])
    console.log(coin);

   const Style=styled(Box)({
   
        display:'flex',
        flexDirection:'row',
        backgroundColor:'black',
        height:'100vh',
        [theme.breakpoints.down('md')]:{
            flexDirection:'column',
            alignItems:'center',
        }

    }
   )
   const Sidebar=styled(Box)({
    width:'30%',
    [theme.breakpoints.down("md")]:{
        width:'100%',
    },
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop:15,
    borderRight:'2px solid grey'
   })
   const Heading=styled(Typography)({
    fontWeight:'bold',
    marginBottom:20,
    fontFamily:"Montserrat"
   })

   const Description = styled(Typography)({
      width: "100%",
      fontFamily: "Montserrat",
      padding: 5,
      paddingBottom: 10,
      paddingTop: 0,
      textAlign: "justify",
   })
   const Market=styled(Box)({
    alignSelf: "start",
    padding: 10,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("lg")]: {
        display: "flex",
        flexDirection:'column',
        justifyContent:'space-around'
      },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'space-around'
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },)
   if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
   <Style>
    <Sidebar>
     <img 
     src={coin?.image.large}
     alt={coin?.name}
     height='150'
     style={{marginBottom:20}}/>
    
     <Heading variant='h3'>{coin?.name}
     </Heading>
     

     <Description variant="subtitle1" >
          {coin?.description.en.split(". ")[0]}
        </Description>
    

    <Market >
    <span style={{ display: "flex" , margin:'10px' }}>
      <Typography variant="h5" fontFamily='Montserrat' >
        Rank :
      </Typography>
      &nbsp; &nbsp;
      <Typography
        variant="h5"
        style={{
          fontFamily: "Montserrat",
        }}
      >
        {numberWithCommas(coin?.market_cap_rank)}
      </Typography>
    </span>

    <span style={{ display: "flex" ,margin:'10px' }}>
      <Typography variant="h5" fontFamily='Montserrat' >
        Current Price :
      </Typography>
      &nbsp; &nbsp;
      <Typography
        variant="h5"
        style={{
          fontFamily: "Montserrat",
        }}
      >
        {symbol}{" "}
        {numberWithCommas(
          coin?.market_data.current_price[currency.toLowerCase()]
        )}
      </Typography>
    </span>
    <span style={{ display: "flex",margin:'10px' }}>
      <Typography variant="h5"  fontFamily='Montserrat'>
        Market Cap :
      </Typography>
      &nbsp; &nbsp;
      <Typography
        variant="h5"
        style={{
          fontFamily: "Montserrat",
        }}
      >
        {symbol}{" "}
        {numberWithCommas(
          coin?.market_data.market_cap[currency.toLowerCase()]
            .toString()
            .slice(0, -6)
        )}
        M
      </Typography>
    </span>
  </Market>
    </Sidebar>
    <CoinInfo coin={coin}/>
   </Style>
  )
}

export default Coin