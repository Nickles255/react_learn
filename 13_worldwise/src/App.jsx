import {BrowserRouter, Routes, Route} from "react-router-dom";
import Product from "./pages/product.jsx";
import Pricing from "./pages/pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {
    return (<div>
            <h1>Hello Router!</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />}/>
                    <Route path="product" element={<Product />}/>
                    <Route path="pricing" element={<Pricing />}/>
                    <Route path="app" element={<AppLayout />}/>
                    <Route path="*" element={<PageNotFound />}/>
                </Routes>
            </BrowserRouter>
        </div>);
}


export default App;