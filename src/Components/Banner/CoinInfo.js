import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { HistoricalChart } from '../../config/api';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from '../../theme/Theme';
import CircularProgress from '@mui/material/CircularProgress';
import {Line} from "react-chartjs-2"
import "chart.js/auto";
import { chartDays } from '../../config/data';
import SelectButton from '../SelectButton';


const CoinInfo = ({coin}) => {
    const [flag,setflag] = useState(false);
    const [historicData,setHistoricData]=useState();
    const [days,setDays]=useState(1);
    const {currency}=useSelector((state)=>state.crypto)

    const fetchHistoricalData=async ()=>{
        const {data}=await axios.get(HistoricalChart(coin.id,days,currency))
        setHistoricData(data.prices);
    }   
    useEffect(()=>{
       fetchHistoricalData();
    },[currency,days])

    console.log("data",historicData)

    const Style=styled(Box)({
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        backgroundColor:'black',
        [theme.breakpoints.down("md")]: {
          width: "100%",
          marginTop: 0,
          padding: 20,
          paddingTop: 0,
        },
      })
  return (
    <Style>
      {
        !historicData?(
            <CircularProgress sx={{color:'gold'}}
            size={250}
            thickness={1}/>  
        ):(
            <>
             <Line
             data={{
                labels:historicData.map((coin)=>{
                    let date=new Date(coin[0]);
                    let time=date.getHours()>12
                    ?`${date.getHours()-12}:${date.getMinutes()} PM`
                    :`${date.getHours()}:${date.getMinutes()} AM`

                    return days===1?time:date.toLocaleDateString();
                }),
                datasets:[
                    {
                        data:historicData.map((coin)=>coin[1]),
                        label:`Price (Past ${days} Days)in ${currency}`,
                        borderColor:'#EEBC1D'
                    }]}}
             options={{
                elements:{
                    point:{
                        radius:1,
                    }
                }
             }}/>
             <div  style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>
              {chartDays.map((day)=>(
                <SelectButton 
                key={day.value}
                onClick={()=>{setDays(day.value);
                    setflag(false);
                }}
                selected={day.value===days}>
                 {day.label}
                </SelectButton>
              ))}
             </div>
            </>
        )
      }
    </Style>
  )
}

export default CoinInfo