import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Product from "./pages/product.jsx";
import Pricing from "./pages/pricing.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

// import Login from "./pages/Login.jsx";

function App() {
    return (<div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="product" element={<Product/>} />
                <Route path="pricing" element={<Pricing/>} />
                <Route path="app" element={<AppLayout/>}>
                    <Route index element={<p>List of Cities</p>} />
                    <Route path="cities" element={<p>List of Cities</p>} />
                    <Route path="countries" element={<p>Countries</p>} />
                    <Route path="form" element={<p>Form</p>} />
                </Route>
                <Route path="login" element={<Login/>} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </BrowserRouter>
    </div>);
}


export default App;