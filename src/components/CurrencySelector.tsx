import react from 'react'
import { Box, makeStyles } from '@material-ui/core'

const useStyles = makeStyles ({
    selectBox: {
        height: '2.5rem',
        width: '5rem',
        borderRadius: '6px'
    }
})

const CurrencySelector = (props: any) => {
    const classes = useStyles();

    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency
    } = props

    return (
        <Box >
        <select className={classes.selectBox} value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map((cur: string) => 
                <option style={{ cursor: 'pointer' }} key={cur} >{cur}</option>)}
        </select>
    </Box>
    )
}

export default CurrencySelector