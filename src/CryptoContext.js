// CryptoContext.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from './cryptoSlice';

const CryptoContext = ({children}) => {
    const dispatch = useDispatch();
    const {currency} = useSelector((state) => state.crypto);

    useEffect(() => {
        dispatch(setCurrency(currency));
    }, [currency, dispatch]);

    return <>{children}</>;
};

export default CryptoContext;
