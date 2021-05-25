import react, { useState, useEffect, useCallback } from 'react'
import {
        AppBar, 
        Box, 
        Typography, 
        Card, 
        makeStyles, 
        IconButton, 
        Divider, 
        FormControl,
        TextField
        } from '@material-ui/core';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import SubmitIcon from '@material-ui/icons/ArrowDownwardSharp';
import { Form, Formik } from 'formik';
import FormikInput from '../formik/FormikInput';
import CurrencySelector from '../components/CurrencySelector'

const apiKey = process.env.REACT_APP_CURRENCY_CONVERTER_API_KEY;
console.log(process.env)

const useStyles = makeStyles ({
    container: {
        backgroundColor: 'lightgrey',
        height: '61rem'
    },
    appBar: {
        height: '3rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '7rem'
    },
    card: {
        position: 'relative',
        width: '50rem',
        height: '22rem'
    },
    formControl: {
        height: '2.5rem',
        marginRight: '1rem'
    },
    textFeild: {
        marginLeft: '1rem'
    },
    usd: {
        marginRight: '1.8rem'
    },
    divider: {
        marginBottom: '3rem'
    }
});

const initialValues = {
    valueFrom: 0
}

const Home = () => {
    const classes = useStyles();
    const [currencyOptions, setCurrencyOptions] = useState<any>([]);
    const [currencyData, setCurrencyData] = useState<any>(false);
    const [selectedCurrency, setSelectedCurrency] = useState('AUD');
    const [convertTo, setConvertTo] = useState<any>();
    const [loading, setLoading] = useState(true);

    const getCurrencyData = async() => {
        try {
            const response = await axios.get(`http://cors-anywhere.herokuapp.com/https://openexchangerates.org/api/latest.json?app_id=${apiKey}`);
            const resolvedData = response.data;
            setCurrencyData(resolvedData)
            setCurrencyOptions(Object.keys(resolvedData.rates));
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if(!currencyData) {
            getCurrencyData();
        }
        setLoading(false);
    },[currencyData])

    const handleSubmit = useCallback(
        function (values) {
            Object.keys(currencyData.rates).forEach((rate) => {
                if(rate === selectedCurrency) {
                    setConvertTo(currencyData.rates[rate] * values.valueFrom)
                };
            })
        },[currencyData, selectedCurrency]
    );
 
    return(
        loading ?
            <Box>
                <Skeleton height="3rem" count={1}/>
                <Box display='flex' justifyContent='center'>
                    <Skeleton height="30rem" width='22rem' count={1}/>
                </Box>
            </Box>
        :
        <Box className={classes.container}>
            <Box>
                <AppBar className={classes.appBar}>
                    <Typography variant='h4'>Currency Conversion</Typography>
                </AppBar>
            </Box>
            <Box className={classes.cardContainer}>
                <Card className={classes.card}>
                    <Formik 
                        initialValues={initialValues}
                        validateOnBlur={false} 
                        validateOnChange={false} 
                        onSubmit={handleSubmit}
                    >
                        <Form>
                            <Box display='flex' justifyContent='center' marginTop='3rem'>
                                <Box display='inline-flex' >
                                    <Typography className={classes.usd} variant='h4'>USD:</Typography>
                                    <Box width='35rem' paddingBottom='2rem'>
                                        <FormikInput
                                            fullWidth
                                            placeholder='input ammount in USD'
                                            size= 'small'
                                            name='valueFrom'
                                            type='string'
                                            variant='outlined'
                                            className='inputs'
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box width='100%' display='flex' justifyContent='center'>
                                <IconButton type='submit' className='button'><SubmitIcon /></IconButton>
                            </Box>
                            <Typography variant='h6'>Results:</Typography>
                            <Divider variant='fullWidth' className={classes.divider} />
                            <Box display='flex' justifyContent='center'>
                                <Box display='inline-flex'>
                                    <FormControl variant='outlined'>
                                        <CurrencySelector 
                                            selectedCurrency={selectedCurrency}
                                            currencyOptions={currencyOptions} 
                                            onChangeCurrency={(e: any) => setSelectedCurrency(e.target.value)}
                                        />
                                    </FormControl>
                                    <Box width='35rem'>
                                    <TextField
                                        disabled
                                        size='small'
                                        variant='outlined'
                                        fullWidth
                                        value={convertTo || ""}
                                        type='string'
                                        className={classes.textFeild}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Form>
                    </Formik>
                </Card>
            </Box>
        </Box>
    )
}

export default Home