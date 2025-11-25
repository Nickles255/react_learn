import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CurrencySelector from "./components/CurrencySelector.jsx";
// https://frankfurter.dev/
// Example: `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`


function App() {
    const [inputAmt, setInputAmt] = useState("");
    const [inputCurrency, setInputCurrency] = useState("USD");
    const [outputCurrency, setOutputCurrency] = useState("USD");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function handleInputCurrency(val) {
        setInputCurrency(val);
    }

    function handleOutputCurrency(val) {
        setOutputCurrency(val);
    }

    useEffect(function () {
        const controller = new AbortController();

        async function fetchCurrencyRate() {
            try {
                setIsLoading(true);
                setError();
                const url = `https:/api.frankfurter.app/latest?amount=${inputAmt}&from=${inputCurrency}&to=${outputCurrency}`
                const res = await fetch(
                    url,
                    {signal: controller.signal}
                );

                if (!res.ok) {
                    throw new Error(`An error occurred! ${res.statusText}`);
                }

                const data = await res.json();
                console.log(data);

            } catch (err) {
                console.log(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);

            }
        }

        if (inputAmt.length > 0) {
            fetchCurrencyRate();
        }
    }, [inputAmt, inputCurrency, outputCurrency])

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Currency Amount"
                value={inputAmt}
                onChange={(e) => setInputAmt(e.target.value)}
            />
            <CurrencySelector onSelectCurrency={handleInputCurrency}/>
            <CurrencySelector onSelectCurrency={handleOutputCurrency}/>
            <p>
                `Current Input Amount {inputAmt}`
                `Current Input Currency {inputCurrency}`
                `Current Output Currency {outputCurrency}`
            </p>
        </div>
    )
}

export default App
