import React, { useEffect, useState } from 'react'
import axios from "axios"
import { TrendingCoins } from '../../config/api'
import { useSelector } from 'react-redux'
import AliceCarousel from "react-alice-carousel"
import { Link } from 'react-router-dom'
const Carousel = () => {
  const[trending,setTrending]=useState([]);
  const { currency , symbol } = useSelector((state) => state.crypto);
 
  const numberWithCommas=(x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  
  const fetchTrendingCoins= async()=>{
    const {data}=await axios.get(TrendingCoins( currency))
    setTrending(data)
  };
  useEffect(()=>{
    fetchTrendingCoins();
  },[currency])
  
  const items=trending.map((coin)=>{
    let profit=coin.price_change_percentage_24h>=0;
    return (
      <Link style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'20px'}} to={`/coins/${coin.id}`}>
       <img  src={coin?.image} alt={coin.name} height="60"
       style={{marginBottom:10}}/>
       <span>{coin?.symbol}
       &nbsp;
        <span style={{
          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
          fontWeight: 500,
        margin:'10px'}}>
         {profit && '+'}
         {coin?.price_change_percentage_24h?.toFixed(2)}%
        </span>
       </span>
       <span style={{ fontSize: 22, fontWeight: 500, color:'white' }}>
       {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
     </span>
       </Link>

    )
  })


  const responsive={
    0:{
      items:2,
    },
    512:{
      items:4,
    }
  };

   return (
    <div style={{height:'50%',display:'flex',alignItems:'center',flexDirection:'column'}}>
      <AliceCarousel 
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}/>
    </div>
  )
}

export default Carousel