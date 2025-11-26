import {useEffect, useState} from 'react'
import './App.css'
import CurrencySelector from "./components/CurrencySelector.jsx";
// https://frankfurter.dev/
// Example: `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`


function App() {
    const [inputAmt, setInputAmt] = useState(1);
    const [inputCurrency, setInputCurrency] = useState("USD");
    const [outputCurrency, setOutputCurrency] = useState("USD");
    const [converted, setConverted] = useState("");
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
                setConverted(data.rates[outputCurrency]);
                console.log(data.rates[outputCurrency]);

            } catch (err) {
                console.log(err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);

            }
        }

        if (outputCurrency === inputCurrency) {
            setConverted(inputAmt);
        } else {
            if ((inputAmt > 0)) {
                fetchCurrencyRate();
            }
        }
    }, [inputAmt, inputCurrency, outputCurrency])

    return (
        <div>
            <h1>Currency Converter</h1>
            <h2>Conversion inputs</h2>
            <div id="inputs">
                <label>Amount: </label>
                <input
                    type="text"
                    placeholder="Enter Currency Amount"
                    value={inputAmt}
                    onChange={(e) => setInputAmt(Number(e.target.value))}
                    disabled={isLoading}
                />
                <label>From: </label>
                <CurrencySelector onSelectCurrency={handleInputCurrency} onLoad={isLoading}/>
                <label>To: </label>
                <CurrencySelector onSelectCurrency={handleOutputCurrency} onLoad={isLoading}/>
            </div>
            <h3>Results</h3>
            <div>
                {isLoading ? <p>Loading...</p> : ""}
                <p>{(!isLoading && converted) ? `\$${converted} ${outputCurrency}` : ""}</p>
            </div>
        </div>
    )
}

export default App
