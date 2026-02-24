import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import ViewPage from "./pages/ViewPage";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Products from "./pages/Products";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />.
            <Route path="/CartPage" element={<CartPage />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/ViewPage" element={<ViewPage />} />
            <Route path="/Products" element={<Products />} />
          </Routes>
        </div> 
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
