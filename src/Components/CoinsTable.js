import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { useSelector } from 'react-redux';
import { Container, Input, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import {  useNavigate } from "react-router-dom";
import styled from '@emotion/styled';

const CoinsTable = () => {
    const PaginationStyle=styled(Pagination)({
        padding:20,width:'100%',display:'flex',justifyContent:'center',color:'gold',
        "& .MuiPaginationItem-root": {
            color: "gold",
          },
    })

    const {currency,symbol} =useSelector((state)=>state.crypto)

    const navigate =useNavigate();
    const [coins,setCoins]=useState([]);
    const [loading,setLoading]=useState(false)
    const [search,setSearch]=useState("")
    const [page,setPage]=useState(1);

    const fetchcoins=async ()=>{
        setLoading(true)
        const {data}=await axios.get(CoinList(currency))
        setCoins(data);
        setLoading(false);
    }
    useEffect(()=>{
        fetchcoins();
    },[currency])

     function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }


    const darkTheme=createTheme({
        palette:{
            primary:{
                main:'#fff',
            },
            type:'dark',
        }
        
    })
    const handleSearch=()=>{
        return coins.filter((coin)=>
            coin.name.toLowerCase().includes(search)|| 
            coin.symbol.toLowerCase().includes(search)
        )
    }
  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{textAlign:'center',width:'100%'}}>
       <Typography
       variant='h4'
       sx={{margin:4,fontWeight:400,fontFamily:"Montserrat",color:'white'}}>
        Cryptocurrency Prices by Market Cap
       </Typography>


       <Input sx={{backgroundColor:'white',color:'black',margin:'20px',padding:'10px',width:'80%',borderRadius:'5px'}} placeholder=" Search any crypto... " 
       onChange={(e)=>setSearch(e.target.value)}/>

       <TableContainer>
       {
        loading?(
            <LinearProgress sx={{backgroundColor:'gold'}}/>
        ):(
          <Table>
            <TableHead sx={{backgroundColor:'#EEBC1D '}}>
            <TableRow>
            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
              <TableCell
                style={{
                  color: "black",
                  fontWeight: "700",
                  fontFamily: "Montserrat",
                }}
                key={head}
                align={head === "Coin" ? "" : "right"}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
            </TableHead>
            <TableBody>
            {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.name}
                      sx={{}}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}/>


                      <div></div>
                     
                      <div style={{display:'flex',flexDirection:'column'}}>
                       
                        <span style={{
                            textTransform:'uppercase',
                            fontSize:22,
                            color:'white'
                        }}>
                          {row.symbol}
                        </span>
                        <span style={{color:'darkgrey'}}>{row.name}</span> 
                      </div>
                      
                        
                     
                      </TableCell>
                      <TableCell align="right" sx={{color:'white'}}>
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right" sx={{color:'white'}}>
                        {symbol}{" "}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>  
        )
       }
       
       </TableContainer>

       <PaginationStyle 
       count={(handleSearch()?.length/10).toFixed(0)}
       onChange={(_,value)=>{
        setPage(value);
        window.scroll(0,450);
       }}
       />

      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable