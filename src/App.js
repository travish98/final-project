import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from "./Navbar";
import Home from './Home';
import About from './About';
import ProductList from './ProductList';
import Product from './Product';
import CreateProduct from './CreateProduct';
import SearchResults from './SearchResults';
import './CSS/App.css';
import Footer from './Footer';


function App() {

  return (
      <div className="App">

      <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<ProductList />} />
              <Route path='/add' element={<CreateProduct />} />
              <Route path='/products/:productId/edit' element={<CreateProduct />} />
              <Route path='/products/:productId' element={<Product />} />
              <Route path='/search' element={<SearchResults />} />
            </Route>    
            <Route path='*' element={<h1>Page Not Found</h1>} />
          </Routes>
          <Footer />
      </BrowserRouter>

      </div>
  );
}

export default App;
