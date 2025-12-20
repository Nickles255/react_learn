import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Product from "./pages/product.jsx";
import Pricing from "./pages/pricing.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import {useEffect, useState} from "react";
import CountryList from "./components/CountryList.jsx";

const BASE_URL = "http://localhost:8000"
// import Login from "./pages/Login.jsx";

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function(){
        async function fetchCities(){
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert('There was an error loading data...')
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, [])

    return (<div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="app" element={<AppLayout />}>
                    <Route index
                           element={<CityList cities={cities} isLoading={isLoading}/>} />
                    <Route path="cities"
                           element={<CityList cities={cities} isLoading={isLoading}/>}
                    />
                    <Route path="countries"
                           element={<CountryList cities={cities} isLoading={isLoading}/>}
                    />
                    <Route path="form" element={<p>Form</p>} />
                </Route>
                <Route path="login" element={<Login/>} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </BrowserRouter>
    </div>);
}


export default App;