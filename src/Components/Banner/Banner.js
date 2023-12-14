import React from 'react'
import styled from '@emotion/styled'
import { Box, Container, Typography } from '@mui/material'
import { TrendingCoins } from '../../config/api'
import Carousel from './Carousel'
const Banner = () => {
    const BannerContent = styled(Container)({
        height: 300,
        display: "flex",
        flexDirection: "column",
        paddingTop: 5,
        justifyContent: "space-around",
    })
    const BannerTitle = styled(Box)({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    })
    return (
        <div style={{
            backgroundImage: "url(./banner2.jpg)"
        }}>
            <BannerContent>
                <BannerTitle>
                    <Typography sx={{ fontWeight: 800,fontSize:'30px', marginBottom: 1, fontFamily: 'Montserrat' }}
                    >Crypto Hunter</Typography>
                    <Typography variant='subtitle2' sx={{color:'darkgray',textTransform:'capitalize',fontFamily:'Montserrat'}}>
                    Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                
                </BannerTitle>
            </BannerContent>
            <Carousel/>
        </div>
    )
}

export default Banner