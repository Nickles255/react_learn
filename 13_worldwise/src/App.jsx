import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Product from "./pages/product.jsx";
import Pricing from "./pages/pricing.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import {useEffect, useState} from "react";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";


// import Login from "./pages/Login.jsx";

function App() {


    return (<div>
        <CitiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="product" element={<Product/>}/>
                    <Route path="pricing" element={<Pricing/>}/>
                    <Route path="app" element={<AppLayout/>}>
                        <Route index element={<Navigate replace to="cities"/>}/>
                        <Route path="cities" element={<CityList/>}/>
                        <Route path="cities/:id" element={<City/>}/>
                        <Route path="countries" element={<CountryList/>}/>
                        <Route path="form" element={<Form/>}/>
                    </Route>
                    <Route path="login" element={<Login/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    </div>);
}


export default App;
