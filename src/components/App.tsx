import React, {useEffect, useState} from 'react';
import '../app.css'
import EnterCurrency from "./EnterCurrency";
import {getExchangeRates} from "../api";
import {currencies} from "../utils/consts";


function App() {

    const [firstInput, setFirstInput] = useState(0);
    const [secondInput, setSecondInput] = useState(0);
    const [firstCurrency, setFirstCurrency] = useState(currencies[0].value.toLowerCase());
    const [secondCurrency, setSecondCurrency] = useState(currencies[0].value.toLowerCase());
    const [ratio, setRatio] = useState(1);

    const onFirstInputChange = (newFirstInputValue: number) => {
        setFirstInput(newFirstInputValue);
        setSecondInput(newFirstInputValue * ratio)
    }

    const onSecondInputChange = (newSecondInputValue: number) => {
        setSecondInput(newSecondInputValue);
        setFirstInput(newSecondInputValue / ratio);
    }

    const onFirstCurrencyChange = (newFirstCurrencyValue: string) => {
        setFirstCurrency(newFirstCurrencyValue);
    }

    const onSecondCurrencyChange = (newSecondCurrencyValue: string) => {
        setSecondCurrency(newSecondCurrencyValue);
    }

    const getExchangeRatesRequest = async () => {
        return getExchangeRates(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${firstCurrency}.json`);
    }

    useEffect(() => {
        getExchangeRatesRequest()
            .then((currencyList) => {
                const newRatio = currencyList[firstCurrency][secondCurrency];
                setRatio(newRatio);
                setFirstInput(secondInput / newRatio);
            });
    }, [firstCurrency])

    useEffect(() => {
        getExchangeRatesRequest()
            .then((currencyList) => {
                const newRatio = currencyList[firstCurrency][secondCurrency];
                setRatio(newRatio);
                setSecondInput(firstInput * newRatio);
            });
    }, [secondCurrency])

    return (
        <div className="App">
            <EnterCurrency currentValue={firstInput} updateCurrentValue={onFirstInputChange}
                           changeCurrentCurrency={onFirstCurrencyChange}/>
            <EnterCurrency currentValue={secondInput} updateCurrentValue={onSecondInputChange}
                           changeCurrentCurrency={onSecondCurrencyChange}/>
        </div>
    );
}

export default App;
